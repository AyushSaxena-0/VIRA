from fastapi import APIRouter, UploadFile, File
from services.parser import extract_text_from_pdf
from services.llm_engine import analyze_resume

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_pdf(content)
    return {"preview": text[:1000]}

@router.post("/analyze-resume")
async def analyze(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_pdf(content)

    result = analyze_resume(text)

    return result