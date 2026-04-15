from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import get_settings
from app.models.schemas import UserProfile

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserProfile:
    settings = get_settings()
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
        )
        email = payload.get("sub")
        if not email:
            raise credentials_exception
    except jwt.PyJWTError as exc:
        raise credentials_exception from exc

    return UserProfile(
        id=1,
        full_name="Aarav Mehta",
        email=email,
        target_role="AI/ML Engineer",
        college="VIT Chennai",
        graduation_year=2027,
    )
