import { LogOut } from "lucide-react";
import Logo from "./ui/Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {initial}
            </div>
            <span className="hidden text-sm font-medium text-ink-soft sm:block">
              {user?.name}
            </span>
          </div>
          <button
            onClick={logout}
            className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-all hover:bg-red-50 hover:text-red-500 hover:[filter:drop-shadow(0_0_8px_rgba(239,68,68,0.55))]"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
