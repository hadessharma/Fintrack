# dependencies.py

import os
from fastapi import Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import auth as firebase_auth

from database import get_db
from crud import get_user_by_firebase_uid, create_user_from_firebase, get_group

load_dotenv()

# Initialize Firebase Admin (only do this once in your app)
if not firebase_admin._apps:
    firebase_admin.initialize_app()

async def get_current_user(
    authorization: str = Header(..., description="Bearer <Firebase ID token>"),
    db: AsyncSession = Depends(get_db),
):
    """
    Verifies the Firebase ID token, looks up (or auto-creates) the user in our DB,
    and returns the User instance.
    """
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    try:
        decoded = firebase_auth.verify_id_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    uid = decoded.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    # Try to find our local User by their Firebase UID
    user = await get_user_by_firebase_uid(db, uid)
    if not user:
        # Optionally auto-provision new users from Firebase claims
        user = await create_user_from_firebase(db, decoded)

    return user


async def verify_group_owner(
    group_id: int,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Ensures that the current_user is the owner of the specified group.
    """
    grp = await get_group(db, group_id)
    if not grp:
        raise HTTPException(status_code=404, detail="Group not found")
    if grp.owner_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Only group owner may perform this action")
    return grp
