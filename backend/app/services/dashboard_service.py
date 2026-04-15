from app.models.schemas import (
    DashboardResponse,
    Insight,
    InterviewHistoryItem,
    Metric,
    PerformancePoint,
    RadarPoint,
    ResumeFeedback,
    SkillGapRecommendation,
    StrengthWeaknessPoint,
    UserProfile,
)
from app.services.ai_service import generate_ai_insights


def build_dashboard_data() -> DashboardResponse:
    user = UserProfile(
        id=1,
        full_name="Aarav Mehta",
        email="student@vira.ai",
        target_role="AI/ML Engineer",
        college="VIT Chennai",
        graduation_year=2027,
    )

    resume_score = 82
    technical_score = 76
    communication_score = 71
    project_score = 85
    final_score = round(
        (resume_score + technical_score + communication_score + project_score) / 4
    )

    insight_response = generate_ai_insights()

    return DashboardResponse(
        user=user,
        final_score=final_score,
        metrics=[
            Metric(label="Overall Score", value=final_score, change=5.2, trend="up"),
            Metric(label="Resume Score", value=resume_score, change=4.3, trend="up"),
            Metric(label="Technical Score", value=technical_score, change=-1.4, trend="down"),
            Metric(label="Communication Score", value=communication_score, change=3.1, trend="up"),
            Metric(label="Placement Readiness", value=79, change=6.8, trend="up"),
        ],
        performance_over_time=[
            PerformancePoint(week="Week 1", overall=58, technical=55, communication=49),
            PerformancePoint(week="Week 2", overall=63, technical=60, communication=54),
            PerformancePoint(week="Week 3", overall=69, technical=66, communication=61),
            PerformancePoint(week="Week 4", overall=74, technical=71, communication=68),
            PerformancePoint(week="Week 5", overall=79, technical=76, communication=71),
        ],
        skill_distribution=[
            RadarPoint(skill="DSA", score=62),
            RadarPoint(skill="System Design", score=70),
            RadarPoint(skill="Python", score=84),
            RadarPoint(skill="Communication", score=71),
            RadarPoint(skill="Projects", score=85),
            RadarPoint(skill="Problem Solving", score=78),
        ],
        strength_vs_weakness=[
            StrengthWeaknessPoint(category="Algorithms", strength=64, weakness=36),
            StrengthWeaknessPoint(category="Frontend", strength=58, weakness=42),
            StrengthWeaknessPoint(category="Backend", strength=79, weakness=21),
            StrengthWeaknessPoint(category="Communication", strength=71, weakness=29),
        ],
        ai_insights=insight_response.insights,
        resume_feedback=ResumeFeedback(
            overall_score=82,
            ats_score=87,
            extracted_keywords=["Python", "FastAPI", "TensorFlow", "OpenAI", "Docker", "PostgreSQL"],
            missing_skills=["Kubernetes", "Redis", "CI/CD", "System Design"],
            strengths=[
                "Quantified project outcomes",
                "Clear education and internship sections",
                "Relevant backend and AI stack keywords",
            ],
            recommendations=[
                "Add impact metrics to your campus projects",
                "Highlight leadership or collaboration signals",
                "Include system design and deployment tooling",
            ],
            summary="Resume is ATS-friendly and technically aligned, but it can better showcase scale, collaboration, and deployment depth.",
        ),
        interview_history=[
            InterviewHistoryItem(session="Mock Interview #1", score=68, focus_area="Behavioral"),
            InterviewHistoryItem(session="Mock Interview #2", score=74, focus_area="Backend APIs"),
            InterviewHistoryItem(session="Mock Interview #3", score=79, focus_area="Machine Learning"),
        ],
        weak_topics=["Dynamic Programming", "Database Indexing", "Conflict Resolution Stories"],
        recommended_skills=[
            SkillGapRecommendation(
                skill="Advanced DSA",
                priority="high",
                action="Solve 5 medium-to-hard interview problems per week.",
                resource="LeetCode + NeetCode roadmap",
            ),
            SkillGapRecommendation(
                skill="System Design",
                priority="medium",
                action="Practice one scalable design case study every weekend.",
                resource="Designing Data-Intensive Applications notes",
            ),
            SkillGapRecommendation(
                skill="Interview Communication",
                priority="medium",
                action="Record answers and tighten structure to 90-second responses.",
                resource="STAR response worksheet",
            ),
        ],
    )
