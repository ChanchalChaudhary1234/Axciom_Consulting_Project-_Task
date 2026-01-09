from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, timedelta
from sqlalchemy import func

from .database import SessionLocal, engine, Base
from . import models, schemas

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Library Management System")

# --- CORS FIX ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# --- Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Startup default users ---
@app.on_event("startup")
def create_default_users():
    db = SessionLocal()
    if not db.query(models.User).filter_by(username="admin").first():
        db.add(models.User(username="admin", password="admin123", role="admin"))
    if not db.query(models.User).filter_by(username="user").first():
        db.add(models.User(username="user", password="user123", role="user"))
    db.commit()
    db.close()

# --- Root ---
@app.get("/")
def root():
    return {"message": "Backend running"}

# --- Login ---
@app.post("/login")
def login(data: schemas.LoginSchema, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.username==data.username,
        models.User.password==data.password
    ).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"role": user.role, "user_id": user.id}

# --- Add Book ---
@app.post("/add-book")
def add_book(book: schemas.BookSchema, db: Session = Depends(get_db)):
    try:
        if not book.title or not book.author or book.copies < 1:
            raise HTTPException(status_code=400, detail="All fields required and copies >=1")
        # Optional: prevent duplicates
        existing = db.query(models.Book).filter_by(title=book.title).first()
        if existing:
            raise HTTPException(status_code=400, detail="Book already exists")
        new_book = models.Book(title=book.title, author=book.author, copies=book.copies)
        db.add(new_book)
        db.commit()
        db.refresh(new_book)
        return {"message": "Book added successfully", "book_id": new_book.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# --- Update Book ---
@app.put("/update-book/{book_id}")
def update_book(book_id: int, book: schemas.BookSchema, db: Session = Depends(get_db)):
    existing = db.query(models.Book).filter(models.Book.id==book_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Book not found")
    for k, v in book.dict().items():
        setattr(existing, k, v)
    db.commit()
    return {"message": "Book updated"}

# --- Issue Book ---
@app.post("/issue-book")
def issue_book(data: schemas.IssueSchema, db: Session = Depends(get_db)):
    if data.issue_date < date.today():
        raise HTTPException(status_code=400, detail="Issue date cannot be in past")
    if data.return_date > date.today() + timedelta(days=15):
        raise HTTPException(status_code=400, detail="Return date cannot exceed 15 days")
    issue = models.Issue(**data.dict())
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return {"message": "Book issued successfully", "issue_id": issue.id}

# --- Admin Stats ---
@app.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db)):
    total_books = db.query(func.sum(models.Book.copies)).scalar() or 0
    issued_books = db.query(models.Issue).filter(models.Issue.returned==False).count()
    total_users = db.query(models.User).filter(models.User.role=="user").count()
    pending_fines = 0
    for t in db.query(models.Issue).filter(models.Issue.returned==False).all():
        if t.return_date < date.today():
            pending_fines += 50
    return {
        "total_books": total_books,
        "issued_books": issued_books,
        "total_users": total_users,
        "pending_fines": pending_fines
    }

# --- Get Users ---
@app.get("/admin/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# --- Reports ---
@app.get("/admin/reports")
def reports(db: Session = Depends(get_db)):
    return db.query(models.Issue).all()
