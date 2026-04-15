import { Card } from "@/components/ui/card";

export function ResumeAnalysis({ feedback }) {
  return (
    <Card>
      <div className="mb-5">
        <h3 className="font-display text-xl font-semibold">Resume Feedback</h3>
        <p className="text-sm text-muted-foreground">ATS alignment, extracted keywords, and missing skills pulled from the latest resume scan.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl bg-muted p-4">
          <p className="text-sm text-muted-foreground">ATS compatibility</p>
          <p className="mt-3 font-display text-4xl font-bold">{feedback.ats_score}%</p>
        </div>
        <div className="rounded-3xl bg-muted p-4 lg:col-span-2">
          <p className="mb-3 text-sm text-muted-foreground">Extracted keywords</p>
          <div className="flex flex-wrap gap-2">
            {feedback.extracted_keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border p-4 lg:col-span-3">
          <p className="mb-3 text-sm text-muted-foreground">Missing skills</p>
          <div className="flex flex-wrap gap-2">
            {feedback.missing_skills.map((skill) => (
              <span key={skill} className="rounded-full bg-danger/10 px-3 py-1 text-sm font-medium text-danger">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
