import { Bot, BriefcaseBusiness, FileText, LayoutDashboard, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Analyzer", icon: FileText },
  { to: "/interview", label: "Interview Sim", icon: Bot },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export function Sidebar() {
  return (
    <aside className="glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] w-[280px] shrink-0 flex-col rounded-[32px] p-6 lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <BriefcaseBusiness className="h-6 w-6" />
        </div>
        <div>
          <p className="font-display text-xl font-bold">VIRA</p>
          <p className="text-sm text-muted-foreground">Placement readiness intelligence</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all",
                isActive && "bg-foreground text-background shadow-lg shadow-foreground/10",
                !isActive && "hover:bg-muted hover:text-foreground",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-[28px] bg-gradient-to-br from-primary/90 to-cyan-500 p-5 text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.24em] text-primary-foreground/70">AI Mentor Avatar</p>
        <h3 className="mt-3 text-xl font-semibold">Daily guidance, resume nudges, and mock interview coaching.</h3>
      </div>
    </aside>
  );
}
