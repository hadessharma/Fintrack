from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import (
    User, Group, GroupMember, Expense, ExpenseShare
)
from schema import (
    UserCreate, GroupCreate, MemberCreate, ExpenseCreate, ExpenseShareCreate
)

# User
async def create_user(db: AsyncSession, user: UserCreate) -> User:
    db_user = User(**user.model_dump())
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_user(db: AsyncSession, user_id: int) -> User:
    res = await db.execute(select(User).where(User.user_id == user_id))
    return res.scalars().first()

async def list_users(db: AsyncSession):
    res = await db.execute(select(User))
    return res.scalars().all()


# Groups
async def create_group(db: AsyncSession, owner_id: int, grp: GroupCreate):
    db_grp = Group(owner_id=owner_id, **grp.model_dump())
    db.add(db_grp)
    await db.commit()
    await db.refresh(db_grp)
    db.add(GroupMember(group_id=db_grp.group_id, user_id=owner_id))
    await db.commit()
    return db_grp

async def get_group(db: AsyncSession, group_id: int) -> Group:
    res = await db.execute(select(Group).where(Group.group_id == group_id))
    return res.scalars().first()

async def list_groups(db: AsyncSession):
    res = await db.execute(select(Group))
    return res.scalars().all()

# Memberships
async def add_group_member(db: AsyncSession, group_id: int, member: MemberCreate):
    db_member = GroupMember(group_id=group_id, **member.model_dump())
    db.add(db_member)
    await db.commit()
    return db_member

async def list_group_members(db: AsyncSession, group_id: int):
    res = await db.execute(
        select(GroupMember).where(GroupMember.group_id == group_id)
    )
    return res.scalars().all()

# Expenses
async def create_expense(db: AsyncSession, group_id: int, payer_id: int, exp: ExpenseCreate):
    db_exp = Expense(group_id=group_id, payer_id=payer_id, **exp.model_dump())
    db.add(db_exp)
    await db.commit()
    await db.refresh(db_exp)
    return db_exp

async def list_group_expenses(db: AsyncSession, group_id: int):
    res = await db.execute(select(Expense).where(Expense.group_id == group_id))
    return res.scalars().all()

# Expense Shares
async def add_expense_share(db: AsyncSession, expense_id: int, share: ExpenseShareCreate):
    db_share = ExpenseShare(expense_id=expense_id, **share.model_dump())
    db.add(db_share)
    await db.commit()
    return db_share

async def list_expense_shares(db: AsyncSession, expense_id: int):
    res = await db.execute(
        select(ExpenseShare).where(ExpenseShare.expense_id == expense_id)
    )
    return res.scalars().all()
