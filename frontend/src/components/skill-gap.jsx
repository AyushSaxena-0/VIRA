import { Card } from "@/components/ui/card";

export function SkillGap({ data }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold">Skill Gap Engine</h3>
          <p className="text-sm text-muted-foreground">Role-based recommendations built from current readiness vs target job expectations.</p>
        </div>
        <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
          Fit Score {data.current_fit_score}%
        </div>
      </div>

      <div className="space-y-3">
        {data.recommended_skills.map((item) => (
          <div key={item.skill} className="grid gap-3 rounded-3xl border border-border bg-background/70 p-4 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-semibold">{item.skill}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.action}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.resource}</p>
            </div>
            <div className="self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
              {item.priority}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
