from sqlalchemy import (
    Column, Integer, String, Numeric, Text,
    ForeignKey, Table, Boolean, DateTime, func
)
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    groups_owned = relationship("GroupMember", back_populates="user")
    memberships = relationship("GroupMember", back_populates="user")
    paid_expenses = relationship("Expense", back_populates="payer")

class Group(Base):
    __tablename__ = "groups"
    group_id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    name = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    owner = relationship("User", back_populates="groups_owned")
    members = relationship("GroupMember", back_populates="group")
    expenses = relationship("Expenses", back_populates="group")

class GroupMember(Base):
    __tablename__ = "group_members"
    group_id = Column(Integer, ForeignKey("groups.group_id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True)
    joined_at = Column(DateTime, server_default=func.now())
    group = relationship("Group", back_populates="members")
    user = relationship("User", back_populates="memberships")

class Expense(Base):
    __tablename__ = "expenses"
    expense_id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.group_id", ondelete="CASCADE"))
    payer_id = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    amount = Column(Numeric(10, 2), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    group = relationship("Group", back_populates="expenses")
    payer = relationship("User", back_populates="paid_expenses")
    shares = relationship("ExpenseShare", back_populates="expense")


class ExpenseShare(Base):
    __tablename__ = "expense_shares"
    expense_id = Column(Integer, ForeignKey("expenses.expense_id", ondelete="CASCADE"), primary_key=True)
    owned_user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True)
    share_amount = Column(Numeric(10, 2), nullable=False)
    paid_back = Column(Boolean, default=False)
    expense = relationship("Expense", back_populates="shares")
    owed_user = relationship("User")
    
