from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class UserProfile(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    target_role: str
    college: str
    graduation_year: int


class AuthRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile


class Metric(BaseModel):
    label: str
    value: float
    change: float
    trend: Literal["up", "down"]


class Insight(BaseModel):
    title: str
    detail: str
    priority: Literal["high", "medium", "low"]


class ResumeFeedback(BaseModel):
    overall_score: int
    ats_score: int
    extracted_keywords: list[str]
    missing_skills: list[str]
    strengths: list[str]
    recommendations: list[str]
    summary: str


class PerformancePoint(BaseModel):
    week: str
    overall: int
    technical: int
    communication: int


class RadarPoint(BaseModel):
    skill: str
    score: int


class StrengthWeaknessPoint(BaseModel):
    category: str
    strength: int
    weakness: int


class InterviewHistoryItem(BaseModel):
    session: str
    score: int
    focus_area: str


class SkillGapRecommendation(BaseModel):
    skill: str
    priority: Literal["high", "medium", "low"]
    action: str
    resource: str


class DashboardResponse(BaseModel):
    user: UserProfile
    final_score: int
    metrics: list[Metric]
    performance_over_time: list[PerformancePoint]
    skill_distribution: list[RadarPoint]
    strength_vs_weakness: list[StrengthWeaknessPoint]
    ai_insights: list[Insight]
    resume_feedback: ResumeFeedback
    interview_history: list[InterviewHistoryItem]
    weak_topics: list[str]
    recommended_skills: list[SkillGapRecommendation]


class InterviewEvaluateRequest(BaseModel):
    role: str
    answer: str
    question: str


class InterviewEvaluateResponse(BaseModel):
    score: int
    communication: int
    confidence: int
    sentiment: str
    keyword_matches: list[str]
    feedback: list[str]


class SkillGapResponse(BaseModel):
    target_role: str
    current_fit_score: int
    recommended_skills: list[SkillGapRecommendation]


class AiInsightsResponse(BaseModel):
    generated_at: str
    insights: list[Insight]
