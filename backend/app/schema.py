from pydantic import BaseModel, EmailStr
from typing import Optional, List

# Users
class UserCreate(BaseModel):
    name: str
    email: EmailStr

class UserRead(UserCreate):
    user_id: int
    class Config:
        orm_mode = True
    
# Groups
class GroupCreate(BaseModel):
    name: str

class GroupRead(GroupCreate):
    group_id: int
    owner_id: int
    class Config:
        orm_mode = True
    
# Membership
class MemberCreate(BaseModel):
    user_id: int

class MemberRead(MemberCreate):
    group_id: int
    joined_at: Optional[str]
    class Config:
        orm_mode = True

# Expenses
class ExpenseCreate(BaseModel):
    amount: float
    description: Optional[str]

class ExpenseRead(ExpenseCreate):
    expense_id: int
    payer_id: int
    created_at: Optional[str]
    class Config:
        orm_mode = True

# Expense Shares
class ExpenseShareCreate(BaseModel):
    owed_user_id: int
    share_amount: float

class ExpenseShareRead(ExpenseCreate):
    expense_id: int
    paid_back: bool
    class Config:
        orm_mode = True
        