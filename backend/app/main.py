# main.py

import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from dotenv import load_dotenv
from contextlib import asynccontextmanager

from database import engine, Base, get_db
import crud, schemas, dependencies

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup: create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # shutdown: (optional cleanup)

app = FastAPI(
    title="FinTrack",
    version="1.0.0",
    lifespan=lifespan
)

# CORS — adjust origins in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Users ---
@app.post("/users/", response_model=schemas.UserRead)
async def create_user(
    user: schemas.UserCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_user(db, user)

@app.get("/users/", response_model=list[schemas.UserRead])
async def list_users(db: AsyncSession = Depends(get_db)):
    return await crud.list_users(db)

# --- Groups ---
@app.post(
    "/groups/",
    response_model=schemas.GroupRead,
    dependencies=[Depends(dependencies.verify_api_key)]
)
async def create_group(
    grp: schemas.GroupCreate,
    current_user=Depends(dependencies.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_group(db, current_user.user_id, grp)

@app.get("/groups/", response_model=list[schemas.GroupRead])
async def list_groups(db: AsyncSession = Depends(get_db)):
    return await crud.list_groups(db)

# --- Memberships ---
@app.post(
    "/groups/{group_id}/members/",
    response_model=schemas.MemberRead,
    dependencies=[
        Depends(dependencies.verify_api_key),
        Depends(dependencies.verify_group_owner)
    ]
)
async def add_member(
    group_id: int,
    member: schemas.MemberCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.add_group_member(db, group_id, member)

@app.get(
    "/groups/{group_id}/members/",
    response_model=list[schemas.MemberRead]
)
async def get_members(
    group_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await crud.list_group_members(db, group_id)

# --- Expenses ---
@app.post(
    "/groups/{group_id}/expenses/",
    response_model=schemas.ExpenseRead,
    dependencies=[Depends(dependencies.verify_api_key)]
)
async def create_expense(
    group_id: int,
    exp: schemas.ExpenseCreate,
    current_user=Depends(dependencies.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_expense(db, group_id, current_user.user_id, exp)

@app.get(
    "/groups/{group_id}/expenses/",
    response_model=list[schemas.ExpenseRead]
)
async def list_expenses(
    group_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await crud.list_group_expenses(db, group_id)

# --- Expense Shares ---
@app.post(
    "/expenses/{expense_id}/shares/",
    response_model=schemas.ExpenseShareRead,
    dependencies=[Depends(dependencies.verify_api_key)]
)
async def add_share(
    expense_id: int,
    share: schemas.ExpenseShareCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.add_expense_share(db, expense_id, share)

@app.get(
    "/expenses/{expense_id}/shares/",
    response_model=list[schemas.ExpenseShareRead]
)
async def list_shares(
    expense_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await crud.list_expense_shares(db, expense_id)
