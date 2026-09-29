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
        {isAdmin ? (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        ) : null}
        {!isSignedIn && <SignInOAuthButtons />}
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
