
import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="rounded-lg">
          <div className="flex size-15 items-center justify-center rounded-lg bg-black">
            <span className="text-4xl font-bold">H</span>
          </div>
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
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
