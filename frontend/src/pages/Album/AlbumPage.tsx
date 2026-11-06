import { useMusicStore } from '@/store/useMusicStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { ArrowLeft, Clock, MoreHorizontal, Pause, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/store/usePlayerStore';
import gsap from 'gsap';

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading, error } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  useEffect(() => {
    if (isLoading || !currentAlbum) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [isLoading, currentAlbum]);

  if (isLoading) {
    return (
      <div className="h-full animate-pulse bg-background p-4 sm:p-8">
        <div className="mb-8 h-8 w-32 rounded-full bg-zinc-800" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="size-56 rounded-2xl bg-zinc-800 sm:size-64" />
          <div className="space-y-4">
            <div className="h-4 w-20 rounded bg-zinc-800" />
            <div className="h-12 w-72 rounded bg-zinc-800" />
            <div className="h-4 w-48 rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentAlbum) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-background p-6 text-center">
        <p className="text-lg font-semibold text-white">{error || 'Album not found'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    );
  }

  const isAlbumPlaying = isPlaying && currentAlbum.songs.some(
    (song) => song._id === currentSong?._id
  );

  const handlePlayAlbum = () => {
    if (isAlbumPlaying) togglePlay();
    else playAlbum(currentAlbum.songs, 0);
  };

  const handlePlaySong = (index: number) => {
    playAlbum(currentAlbum.songs, index);
  };

  return (
    <div className="h-full overflow-hidden bg-background">
      <div ref={pageRef} className="h-full w-full">
        <ScrollArea className="h-full rounded-md">
          <div className="relative min-h-full overflow-hidden bg-background">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-136 overflow-hidden" aria-hidden="true">
              <img
                src={currentAlbum.imageUrl}
                alt=""
                className="h-full w-full scale-110 object-cover opacity-25 blur-3xl"
              />
              <div className="absolute inset-0 bg-linear-to-b from-violet-950/70 via-background/85 to-background" />
            </div>

            <div className="relative z-10">
              <div className="px-4 pt-4 sm:px-8 sm:pt-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-zinc-300 backdrop-blur transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Back to home
                </Link>
              </div>

              <section className="flex flex-col items-center gap-7 px-4 pb-8 pt-4 sm:flex-row sm:items-end sm:gap-8 sm:px-8 sm:pb-10 sm:pt-8">
                <img
                  src={currentAlbum.imageUrl}
                  alt={currentAlbum.title}
                  className="size-52 rounded-2xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:size-64"
                />

                <div className="flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Album</p>
                  <h1 className="my-3 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {currentAlbum.title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-zinc-300 sm:justify-start">
                    <span className="font-semibold text-white">{currentAlbum.artist}</span>
                    <span className="text-zinc-500">•</span>
                    <span>{currentAlbum.songs.length} songs</span>
                    <span className="text-zinc-500">•</span>
                    <span>{currentAlbum.releaseYear}</span>
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-3 px-4 pb-6 sm:px-8">
                <Button
                  onClick={handlePlayAlbum}
                  size="icon-lg"
                  className="size-14 rounded-full bg-white text-black shadow-lg shadow-black/20 hover:scale-105 hover:bg-zinc-200"
                  aria-label={isAlbumPlaying ? 'Pause album' : 'Play album'}
                >
                  {isAlbumPlaying ? <Pause className="size-6" /> : <Play className="size-6 fill-current" />}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:bg-white/10 hover:text-white" aria-label="More album options">
                  <MoreHorizontal className="size-5" />
                </Button>
              </div>

              <section className="border-t border-white/10 bg-black/10 px-3 pb-12 pt-3 backdrop-blur-sm sm:px-6">
                <div className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:grid-cols-[2rem_minmax(0,4fr)_minmax(7rem,2fr)_auto] sm:px-4">
                  <span>#</span>
                  <span>Title</span>
                  <span className="hidden sm:block">Released</span>
                  <Clock className="size-4" />
                </div>

                <div className="space-y-1 pt-2">
                  {currentAlbum.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;

                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className={`group grid cursor-pointer grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors sm:grid-cols-[2rem_minmax(0,4fr)_minmax(7rem,2fr)_auto] sm:px-4 ${isCurrentSong ? 'bg-emerald-400/10' : 'hover:bg-white/5'}`}
                      >
                        <div className={`flex size-8 items-center justify-center ${isCurrentSong ? 'text-emerald-300' : 'text-zinc-500'}`}>
                          {isCurrentSong && isPlaying ? (
                            <span className="text-base">♫</span>
                          ) : (
                            <>
                              <span className="group-hover:hidden">{index + 1}</span>
                              <Play className="hidden size-4 fill-current group-hover:block" />
                            </>
                          )}
                        </div>

                        <div className="flex min-w-0 items-center gap-3">
                          <img src={song.imageUrl} alt={song.title} className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-white/10" />
                          <div className="min-w-0">
                            <div className={`truncate font-medium ${isCurrentSong ? 'text-emerald-300' : 'text-white'}`}>{song.title}</div>
                            <div className="truncate text-zinc-400">{song.artist}</div>
                          </div>
                        </div>

                        <div className="hidden items-center text-zinc-500 sm:flex">{song.createdAt.split('T')[0]}</div>
                        <div className="flex items-center text-zinc-400 tabular-nums">{formatDuration(song.duration)}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AlbumPage;
