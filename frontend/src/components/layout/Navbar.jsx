import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

export function Navbar() {
  const user = useAppStore((state) => state.user);

  return (
    <header className="glass-panel flex flex-col gap-4 rounded-[28px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Virtual Intelligent Review Assistant</p>
        <h1 className="mt-1 font-display text-2xl font-bold">Your placement cockpit</h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          Search insights, skills, or sessions
        </div>
        <ThemeToggle />
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          3 Alerts
        </Button>
        <div className="flex items-center gap-3 rounded-2xl bg-muted px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            {user?.full_name?.[0] || "V"}
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.full_name || "VIRA Student"}</p>
            <p className="text-xs text-muted-foreground">{user?.target_role || "Placement Track"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
