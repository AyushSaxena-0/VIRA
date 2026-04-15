from fastapi import APIRouter, HTTPException, status

from app.core.security import create_access_token, hash_password, verify_password
from app.models.schemas import AuthRequest, AuthResponse, UserProfile

router = APIRouter(prefix="/auth", tags=["auth"])

DEMO_USER = {
    "id": 1,
    "full_name": "Aarav Mehta",
    "email": "student@vira.ai",
    "target_role": "AI/ML Engineer",
    "college": "VIT Chennai",
    "graduation_year": 2027,
    "password_hash": hash_password("Password@123"),
}


@router.post("/login", response_model=AuthResponse)
def login(payload: AuthRequest) -> AuthResponse:
    if payload.email != DEMO_USER["email"] or not verify_password(
        payload.password, DEMO_USER["password_hash"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    user = UserProfile(
        id=DEMO_USER["id"],
        full_name=DEMO_USER["full_name"],
        email=DEMO_USER["email"],
        target_role=DEMO_USER["target_role"],
        college=DEMO_USER["college"],
        graduation_year=DEMO_USER["graduation_year"],
    )
    return AuthResponse(access_token=create_access_token(user.email), user=user)
