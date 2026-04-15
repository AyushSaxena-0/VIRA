import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

function ResumeUpload() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const uploadResume = useAppStore((state) => state.uploadResume);
  const resumeAnalysis = useAppStore((state) => state.resumeAnalysis);
  const loading = useAppStore((state) => state.loading.resume);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setFileName(file.name);
    await uploadResume(file);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
      <Card className="flex flex-col justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Resume Analyzer</p>
          <h2 className="mt-3 font-display text-4xl font-bold">Upload your PDF and let VIRA score quality, ATS fit, and missing skills.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Secure PDF-only upload, parser validation, AI-assisted keyword extraction, and actionable recommendations for campus placements.
          </p>
        </div>

        <div
          className="mt-8 flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-[32px] border border-dashed border-border bg-muted/60 p-8 text-center"
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud className="h-12 w-12 text-primary" />
          <p className="mt-4 text-lg font-semibold">{fileName || "Choose a resume PDF"}</p>
          <p className="mt-2 text-sm text-muted-foreground">Maximum 5 MB. Only `.pdf` files are accepted.</p>
          <Button className="mt-6" disabled={loading}>
            {loading ? "Analyzing..." : "Upload Resume"}
          </Button>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,application/pdf"
          onChange={handleChange}
        />
      </Card>

      <Card>
        <h3 className="font-display text-2xl font-semibold">Latest Analysis</h3>
        {!resumeAnalysis ? (
          <p className="mt-4 text-muted-foreground">Upload a resume to see extracted keywords, ATS compatibility, and improvement areas.</p>
        ) : (
          <div className="mt-5 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm text-muted-foreground">Resume Score</p>
                <p className="mt-2 font-display text-4xl font-bold">{resumeAnalysis.overall_score}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm text-muted-foreground">ATS Compatibility</p>
                <p className="mt-2 font-display text-4xl font-bold">{resumeAnalysis.ats_score}%</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">Extracted keywords</p>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.extracted_keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">Recommendations</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {resumeAnalysis.recommendations.map((item) => (
                  <li key={item} className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ResumeUpload;
