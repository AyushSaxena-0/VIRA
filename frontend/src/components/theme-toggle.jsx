import { Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunMedium className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}
