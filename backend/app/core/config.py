from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "VIRA API"
    api_prefix: str = "/api/v1"
    app_env: str = "development"
    debug: bool = True
    ai_provider: str = "ollama"
    frontend_url: str = "http://localhost:5173"
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 120
    openai_api_key: str = ""
    openai_model: str = "gpt-4.1-mini"
    ollama_base_url: str = "http://127.0.0.1:11434"
    ollama_model: str = "llama3:latest"
    ollama_timeout_seconds: int = 60
    postgres_user: str = "vira"
    postgres_password: str = "vira"
    postgres_db: str = "vira"
    postgres_host: str = "db"
    postgres_port: int = 5432
    upload_dir: str = "storage/uploads"
    max_upload_size_mb: int = 5

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
