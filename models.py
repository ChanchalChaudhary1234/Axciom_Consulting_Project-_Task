from sqlalchemy import Column, Integer, String, Date, Boolean
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    role = Column(String)


class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    copies = Column(Integer, default=1)


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer)
    user_id = Column(Integer)
    book_title = Column(String)
    issue_date = Column(Date)
    return_date = Column(Date)
    returned = Column(Boolean, default=False)
