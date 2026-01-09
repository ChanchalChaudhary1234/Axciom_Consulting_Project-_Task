from pydantic import BaseModel
from datetime import date
from typing import Optional

# LOGIN
class LoginSchema(BaseModel):
    username: str
    password: str

# ADD / UPDATE BOOK
class BookSchema(BaseModel):
    title: str
    author: str
    copies: int = 1

# ISSUE BOOK
class IssueSchema(BaseModel):
    book_id: int
    user_id: Optional[int] = None
    book_title: Optional[str] = None
    issue_date: date
    return_date: date
    returned: Optional[bool] = False
