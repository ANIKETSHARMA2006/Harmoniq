
import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="mb-8 flex min-w-0 items-center gap-3">
        <Link to="/" className="rounded-lg">
            <div className="flex size-15 items-center justify-center rounded-lg border border-white/10 bg-zinc-900">
            <span className="text-5xl font-bold">H</span>
          </div>
        </Link>

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Music Manager</h1>
          <p className="text-zinc-400 mt-1">
            Manage your music catalog
          </p>
        </div>
      </div>

      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              width: "35px",
              height: "35px",
            },
          },
        }}
      />
    </div>
  );
};

export default Header;
