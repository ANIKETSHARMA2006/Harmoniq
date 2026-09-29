import { LayoutDashboardIcon } from "lucide-react";
import { useAuth, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const { isSignedIn } = useAuth();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 text-white backdrop-blur-md z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-black">
          <span className="text-lg font-bold">H</span>
        </div>
        <div className="flex items-center gap-2">Harmoniq</div>
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <Link
  to="/admin"
  className={cn(
    "group relative inline-flex items-center gap-1.5 overflow-hidden",
    "rounded-lg border border-emerald-500/30",
    "bg-zinc-900/90 px-3.5 py-2",
    "text-xs font-semibold text-zinc-200",
    "shadow-[0_3px_16px_rgba(0,0,0,0.3)]",
    "transition-all duration-300",
    "hover:-translate-y-0.5",
    "hover:border-emerald-400/60",
    "hover:bg-emerald-500/10",
    "hover:text-white",
    "hover:shadow-[0_6px_24px_rgba(16,185,129,0.18)]"
  )}
>
  <span
    className="
      absolute inset-0 -translate-x-full
      bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent
      transition-transform duration-700
      group-hover:translate-x-full
    "
  />

  <LayoutDashboardIcon
    className="
      relative size-3.5 text-emerald-400
      transition-all duration-300
      group-hover:scale-110
      group-hover:rotate-3
    "
  />

  <span className="relative">Upload Songs</span>
</Link>
        ) : null}
        {!isSignedIn && <SignInOAuthButtons />}
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
