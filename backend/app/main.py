from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, dashboard, insights, interview, resume
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="VIRA: Virtual Intelligent Review Assistant backend APIs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(dashboard.router, prefix=settings.api_prefix)
app.include_router(resume.router, prefix=settings.api_prefix)
app.include_router(interview.router, prefix=settings.api_prefix)
app.include_router(insights.router, prefix=settings.api_prefix)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "VIRA API is running"}
