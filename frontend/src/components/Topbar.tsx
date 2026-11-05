import { HomeIcon, LayoutDashboardIcon, Library, MessageCircle } from "lucide-react";
import { useAuth, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMusicStore } from "@/store/useMusicStore";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  const toggleLibrary = () => {
    const nextOpen = !isLibraryOpen;
    setIsLibraryOpen(nextOpen);
    if (nextOpen && albums.length === 0) fetchAlbums();
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-white/5 bg-zinc-950/75 p-3 text-white backdrop-blur-xl sm:p-4">
      {/* Logo */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900">
          <span className="text-xl font-bold">H</span>
        </div>
        <div className="hidden items-center gap-2 font-semibold tracking-tight sm:flex">Harmoniq</div>

        <nav className="ml-1 flex items-center gap-1 md:hidden" aria-label="Mobile navigation">
          <Link
            to="/"
            aria-label="Home"
            className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HomeIcon className="size-5" />
          </Link>
          {isSignedIn && (
            <Link
              to="/chat"
              aria-label="Messages"
              className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <MessageCircle className="size-5" />
            </Link>
          )}
          <div className="relative">
            <button
              type="button"
              aria-label="Open playlists"
              aria-expanded={isLibraryOpen}
              onClick={toggleLibrary}
              className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Library className="size-5" />
            </button>

            {isLibraryOpen && (
              <div className="absolute left-0 top-12 z-50 w-64 rounded-xl border border-white/10 bg-zinc-900 p-2 shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between px-2 py-2">
                  <h2 className="text-sm font-semibold text-white">Playlists</h2>
                  <button
                    type="button"
                    onClick={() => setIsLibraryOpen(false)}
                    className="text-xs text-zinc-500 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-64 space-y-1 overflow-y-auto">
                  {isLoading && <p className="px-2 py-3 text-sm text-zinc-400">Loading playlists...</p>}
                  {!isLoading && albums.length === 0 && <p className="px-2 py-3 text-sm text-zinc-400">No playlists yet.</p>}
                  {albums.map((album) => (
                    <Link
                      key={album._id}
                      to={`/albums/${album._id}`}
                      onClick={() => setIsLibraryOpen(false)}
                      className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-white/10"
                    >
                      <img src={album.imageUrl} alt="" className="size-9 rounded-md object-cover" />
                      <span className="min-w-0 truncate text-zinc-200">{album.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
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
    "hover:border-emerald-400/60",
    "hover:bg-emerald-500/10",
    "hover:text-white",
    "hover:shadow-[0_6px_24px_rgba(16,185,129,0.18)]"
  )}
>
  <span
    className="
      absolute inset-0 -translate-x-full
      bg-linear-to-r from-transparent via-emerald-400/10 to-transparent
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
