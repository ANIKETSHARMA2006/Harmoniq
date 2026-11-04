
import { useMusicStore } from '@/store/useMusicStore';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Pause, Play } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import gsap from 'gsap';

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();

  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  const {
    currentSong,
    isPlaying,
    playAlbum,
    togglePlay
  } = usePlayerStore();

  const pageRef = useRef<HTMLDivElement>(null);

  // Fetch album data
  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [fetchAlbumById, albumId]);

  // GSAP entrance animation
  useEffect(() => {
    if (isLoading || !currentAlbum) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        {
          scale: 0.92,
          y: 30,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.65)",
          force3D: true,
        }
      );
    }, pageRef);

    // Cleanup on unmount
    return () => {
      ctx.revert();
    };

  }, [isLoading, currentAlbum]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playAlbum(currentAlbum.songs, index);
  };

  return (
    <div className="h-full overflow-hidden">

      <div ref={pageRef} className="h-full w-full">

        <ScrollArea className="h-full rounded-md">

          {/* Main Content */}
          <div className="relative min-h-full">

            {/* Background Gradient */}
            <div
              className="absolute inset-0 bg-linear-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10">

              {/* Album Header */}
              <div className="flex p-6 gap-6 pb-8">

                <img
                  src={currentAlbum?.imageUrl}
                  alt={currentAlbum?.title}
                  className="w-60 h-60 shadow-xl rounded"
                />

                <div className="flex flex-col justify-end">

                  <p className="text-sm font-medium">
                    Album
                  </p>

                  <h1 className="text-7xl font-bold my-4">
                    {currentAlbum?.title}
                  </h1>

                  <div className="flex items-center gap-2 text-sm text-zinc-100">

                    <span className="font-medium text-white">
                      {currentAlbum?.artist}
                    </span>

                    <span>
                      • {currentAlbum?.songs.length} songs
                    </span>

                    <span>
                      • {currentAlbum?.releaseYear}
                    </span>

                  </div>
                </div>
              </div>

              {/* Play Button */}
              <div className="px-6 pb-4 flex items-center gap-6">

                <Button
                  onClick={handlePlayAlbum}
                  size="icon"
                  className="w-14 h-14 rounded-full bg-white hover:bg-white hover:scale-105 transition-all"
                >
                  {isPlaying && currentAlbum?.songs.some(
                    (song) => song._id === currentSong?._id
                  ) ? (
                    <Pause className="h-7 w-7 text-black" />
                  ) : (
                    <Play className="h-7 w-7 text-black" />
                  )}
                </Button>

              </div>

              {/* Songs Table */}
              <div className="bg-black/20 backdrop-blur-sm">

                {/* Table Header */}
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">

                  <div>#</div>

                  <div>Title</div>

                  <div>Released Date</div>

                  <div>
                    <Clock className="h-4 w-4" />
                  </div>

                </div>

                {/* Songs List */}
                <div className="px-6">

                  <div className="space-y-2 py-4">

                    {currentAlbum?.songs.map((song, index) => {

                      const isCurrentSong = currentSong?._id === song._id;

                      return (
                        <div
                          key={song._id}
                          onClick={() => handlePlaySong(index)}
                          className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 transition duration-150 hover:bg-white/5 rounded-md group cursor-pointer"
                        >

                          {/* Song Number / Playing Icon */}
                          <div className="flex items-center justify-center">

                            {isCurrentSong && isPlaying ? (
                              <div className="size-4 text-white">
                                ♫
                              </div>
                            ) : (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}

                            {!isCurrentSong && (
                              <Play className="h-4 w-4 hidden group-hover:block" />
                            )}

                          </div>

                          {/* Song Details */}
                          <div className="flex items-center gap-3">

                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-10"
                            />

                            <div>

                              <div className="font-medium text-white">
                                {song.title}
                              </div>

                              <div>
                                {song.artist}
                              </div>

                            </div>
                          </div>

                          {/* Release Date */}
                          <div className="flex items-center">
                            {song.createdAt.split("T")[0]}
                          </div>

                          {/* Duration */}
                          <div className="flex items-center">
                            {formatDuration(song.duration)}
                          </div>

                        </div>
                      );
                    })}

                  </div>
                </div>
              </div>

            </div>
          </div>

        </ScrollArea>
      </div>
    </div>
  );
};

export default AlbumPage;
