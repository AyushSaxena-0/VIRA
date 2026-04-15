from datetime import datetime, timedelta, timezone
import hashlib
import hmac

import jwt

from app.core.config import get_settings


def hash_password(password: str) -> str:
    settings = get_settings()
    digest = hashlib.sha256(f"{settings.jwt_secret}:{password}".encode("utf-8")).hexdigest()
    return digest


def verify_password(plain_password: str, hashed_password: str) -> bool:
    expected = hash_password(plain_password)
    return hmac.compare_digest(expected, hashed_password)


def create_access_token(subject: str) -> str:
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
