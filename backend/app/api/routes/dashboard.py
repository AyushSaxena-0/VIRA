from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.schemas import DashboardResponse, UserProfile
from app.services.dashboard_service import build_dashboard_data

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard-data", response_model=DashboardResponse)
def get_dashboard_data(_: UserProfile = Depends(get_current_user)) -> DashboardResponse:
    return build_dashboard_data()
