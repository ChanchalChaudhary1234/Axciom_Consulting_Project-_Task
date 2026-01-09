# Axciom_Consulting_Project-_Task
📚 Smart Library Management System

A full-stack Library Management System for managing books, users, issuing/returning, fines, and reports.
Built with FastAPI, SQLite, and React (Vite).

Features
Admin

Add, update, and manage books.

View all library members.

Issue books and track status.

Dashboard with stats:

Total Books

Issued Books

Total Users

Pending Fines

Generate reports of all issued books.

User

Issue books with issue and return dates.

View dashboard stats.

Tech Stack

Backend: FastAPI, SQLAlchemy, SQLite

Frontend: React (Vite), TailwindCSS

Database: SQLite (library.db)

Project Structure
backend/
  └─ app/
      ├─ main.py        # FastAPI routes
      ├─ models.py      # Database models
      ├─ schemas.py     # Pydantic schemas
      └─ database.py    # SQLite connection

frontend/
  └─ src/
      ├─ components/   # React components
      └─ App.jsx       # Main app

library.db             # SQLite database
README.md
