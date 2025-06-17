import os
from fastapi import Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from dotenv import load_dotenv

from database import get_db
from crud import get_user, get_group

load_dotenv()
API_SECRET = os.getenv("API_SECRET", "Update this to your secret!!")

# Simple API-key check
def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_SECRET:
        raise HTTPException(401, "Unauthorized")

# Stub auth: read X-User-Id header
async def get_current_user(
    x_user_id: int = Header(...),
    db: AsyncSession = Depends(get_db)
):
    user = await get_user(db, x_user_id)
    if not user:
        raise HTTPException(401, "Invalid user")
    return user

# Ensure only the owner may manage a group
async def verify_group_owner(
    group_id: int,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    grp = await get_group(db, group_id)
    if not grp:
        raise HTTPException(404, "Group not found")
    if grp.owner_id != current_user.user_id:
        raise HTTPException(403, "Only group owner may perform this action")
    return grp
