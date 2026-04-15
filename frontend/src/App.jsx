import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import Interview from "@/pages/Interview";
import Profile from "@/pages/Profile";
import ResumeUpload from "@/pages/ResumeUpload";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
