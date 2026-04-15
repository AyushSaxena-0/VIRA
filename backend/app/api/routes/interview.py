from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.schemas import (
    InterviewEvaluateRequest,
    InterviewEvaluateResponse,
    UserProfile,
)
from app.services.ai_service import evaluate_interview

router = APIRouter(tags=["interview"])


@router.post("/interview-evaluate", response_model=InterviewEvaluateResponse)
def interview_evaluate(
    payload: InterviewEvaluateRequest,
    _: UserProfile = Depends(get_current_user),
) -> InterviewEvaluateResponse:
    return evaluate_interview(payload)
