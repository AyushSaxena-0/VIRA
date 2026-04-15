from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.schemas import AiInsightsResponse, SkillGapResponse, UserProfile
from app.services.ai_service import generate_ai_insights, get_skill_gap

router = APIRouter(tags=["ai"])


@router.get("/ai-insights", response_model=AiInsightsResponse)
def ai_insights(_: UserProfile = Depends(get_current_user)) -> AiInsightsResponse:
    return generate_ai_insights()


@router.get("/skill-gap", response_model=SkillGapResponse)
def skill_gap(
    role: str = "AI/ML Engineer",
    _: UserProfile = Depends(get_current_user),
) -> SkillGapResponse:
    return get_skill_gap(role)
