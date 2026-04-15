import { Award, BookOpenText, Goal, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";

const highlights = [
  { icon: Goal, title: "Placement Goal", value: "Product-driven AI roles in 6 months" },
  { icon: Award, title: "Readiness Level", value: "Interview active and improving each sprint" },
  { icon: BookOpenText, title: "Learning Focus", value: "DSA, system design, and communication" },
  { icon: UserCheck, title: "Mentor Status", value: "AI mentor nudges enabled" },
];

function Profile() {
  const user = useAppStore((state) => state.user);
  const dashboard = useAppStore((state) => state.dashboard);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
      <Card className="bg-gradient-to-br from-primary/95 to-cyan-500 text-primary-foreground">
        <p className="text-sm uppercase tracking-[0.24em] text-primary-foreground/70">Student Profile</p>
        <h2 className="mt-4 font-display text-4xl font-bold">{user?.full_name || "VIRA Student"}</h2>
        <p className="mt-3 max-w-xl text-primary-foreground/80">
          Personal readiness profile across resume quality, interviews, communication, and project depth.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/15 p-5">
            <p className="text-sm text-primary-foreground/70">Email</p>
            <p className="mt-2 text-lg font-semibold">{user?.email}</p>
          </div>
          <div className="rounded-3xl bg-white/15 p-5">
            <p className="text-sm text-primary-foreground/70">Target Role</p>
            <p className="mt-2 text-lg font-semibold">{user?.target_role}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-2xl font-semibold">Growth Snapshot</h3>
        <div className="mt-5 space-y-3">
          {highlights.map(({ icon: Icon, title, value }) => (
            <div key={title} className="flex items-start gap-3 rounded-3xl border border-border bg-background/70 p-4">
              <div className="rounded-2xl bg-muted p-3">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-muted p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Current placement readiness</p>
          <p className="mt-3 font-display text-5xl font-bold">{dashboard?.final_score || "--"}</p>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
