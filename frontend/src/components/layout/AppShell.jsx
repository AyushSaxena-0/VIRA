import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useAppStore } from "@/store/useAppStore";

export function AppShell({ children }) {
  const initialize = useAppStore((state) => state.initialize);
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-grid [background-size:20px_20px]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-4 lg:p-6">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
