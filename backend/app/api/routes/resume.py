from fastapi import APIRouter, Depends, File, UploadFile

from app.api.deps import get_current_user
from app.models.schemas import ResumeFeedback, UserProfile
from app.services.resume_service import (
    analyze_resume_text,
    extract_text_from_pdf,
    persist_upload,
)

router = APIRouter(tags=["resume"])


@router.post("/analyze-resume", response_model=ResumeFeedback)
async def analyze_resume(
    file: UploadFile = File(...),
    _: UserProfile = Depends(get_current_user),
) -> ResumeFeedback:
    content = await persist_upload(file)
    extracted_text = extract_text_from_pdf(content)
    return analyze_resume_text(extracted_text)
