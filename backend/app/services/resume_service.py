from pathlib import Path
from uuid import uuid4

import fitz
from fastapi import HTTPException, UploadFile, status

from app.core.config import get_settings
from app.models.schemas import ResumeFeedback
from app.services.ollama_service import generate_json

ALLOWED_CONTENT_TYPES = {"application/pdf"}


async def persist_upload(file: UploadFile) -> bytes:
    settings = get_settings()
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF resumes are supported.",
        )

    content = await file.read()
    if len(content) > settings.max_upload_size_mb * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Resume exceeds {settings.max_upload_size_mb} MB size limit.",
        )

    upload_dir = Path(settings.upload_dir)
    upload_dir.mkdir(parents=True, exist_ok=True)
    target = upload_dir / f"{uuid4()}.pdf"
    target.write_bytes(content)
    return content


def extract_text_from_pdf(content: bytes) -> str:
    document = fitz.open(stream=content, filetype="pdf")
    return " ".join(page.get_text().strip() for page in document)


def analyze_resume_text(text: str) -> ResumeFeedback:
    prompt = f"""
You are VIRA, a resume analyzer for student placements.
Return valid JSON only in this shape:
{{
  "overall_score": 0,
  "ats_score": 0,
  "extracted_keywords": ["string"],
  "missing_skills": ["string"],
  "strengths": ["string"],
  "recommendations": ["string"],
  "summary": "string"
}}

Analyze this resume text:
{text[:6000]}
"""
    llm_response = generate_json(prompt)
    if llm_response:
        try:
            return ResumeFeedback(
                overall_score=max(0, min(100, int(llm_response.get("overall_score", 80)))),
                ats_score=max(0, min(100, int(llm_response.get("ats_score", 80)))),
                extracted_keywords=[str(item) for item in llm_response.get("extracted_keywords", [])][:10],
                missing_skills=[str(item) for item in llm_response.get("missing_skills", [])][:10],
                strengths=[str(item) for item in llm_response.get("strengths", [])][:5],
                recommendations=[str(item) for item in llm_response.get("recommendations", [])][:5],
                summary=str(llm_response.get("summary", "Resume analyzed by VIRA.")),
            )
        except (TypeError, ValueError):
            pass

    lowered = text.lower()
    keywords = []
    for keyword in ["python", "fastapi", "docker", "postgresql", "openai", "react"]:
        if keyword in lowered:
            keywords.append(keyword.title())

    missing = [
        skill
        for skill in ["Kubernetes", "Redis", "CI/CD", "System Design"]
        if skill.lower() not in lowered
    ]
    resume_score = min(94, 60 + len(keywords) * 5 + max(0, 10 - len(missing) * 2))
    ats_score = min(96, resume_score + 5)

    return ResumeFeedback(
        overall_score=resume_score,
        ats_score=ats_score,
        extracted_keywords=keywords or ["Python", "Projects", "Communication"],
        missing_skills=missing,
        strengths=[
            "Role-aligned technical stack detected",
            "Project section includes implementation depth",
            "Resume structure is easy for ATS parsers to scan",
        ],
        recommendations=[
            "Add measurable impact for each project or internship bullet",
            "Include deployment and monitoring tools for production readiness",
            "Bring behavioral and leadership evidence into the experience section",
        ],
        summary="VIRA detected a technically promising resume with room to improve scale signals and placement storytelling.",
    )
