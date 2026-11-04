
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/usePlayerStore";

import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
  } = usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // GSAP refs
  const footerRef = useRef<HTMLElement>(null);
  const songInfoRef = useRef<HTMLDivElement>(null);
  const albumArtRef = useRef<HTMLImageElement>(null);

  // Audio event listeners
  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(
        Number.isFinite(audio.currentTime) ? audio.currentTime : 0
      );
    };

    const updateDuration = () => {
      setDuration(
        Number.isFinite(audio.duration) ? audio.duration : 0
      );
    };

    setCurrentTime(0);
    updateDuration();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, [currentSong]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Main GSAP entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. Entire player slides upward
      tl.fromTo(
        footerRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.75)",
          force3D: true,
        }
      );

      // 2. Player buttons appear with a stagger
      tl.fromTo(
        "[data-player-control]",
        {
          y: 12,
          scale: 0.8,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "back.out(2)",
        },
        "-=0.55"
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Animate song information whenever the song changes
  useLayoutEffect(() => {
    if (!currentSong) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Album artwork pop
      tl.fromTo(
        albumArtRef.current,
        {
          scale: 0.7,
          rotation: -12,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.6)",
        }
      );

      // Song title and artist slide in
      tl.fromTo(
        ".song-details",
        {
          x: 20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );

    }, songInfoRef);

    return () => ctx.revert();
  }, [currentSong?._id]);

  // Seek control
  const handleSeek = (value: number | readonly number[]): void => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        typeof value === "number" ? value : (value[0] ?? 0);
    }
  };

  // Volume control
  const handleVolumeChange = (
    value: number | readonly number[]
  ): void => {
    const nextVolume =
      typeof value === "number" ? value : (value[0] ?? 0);

    setVolume(nextVolume);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume / 100;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="h-20 sm:h-24 rounded-md bg-black border-t px-4"
    >
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">

        {/* Currently Playing Song */}
        <div
          ref={songInfoRef}
          className="hidden sm:flex items-center gap-4 min-w-45 w-[30%]"
        >
          {currentSong && (
            <>
              <img
                ref={albumArtRef}
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md shadow-lg"
              />

              <div className="flex-1 min-w-0">
                <div className="song-details font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>

                <div className="song-details text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">

          <div className="flex items-center gap-4 sm:gap-6">

            {/* Shuffle */}
            <Button
              data-player-control
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
              aria-label="Shuffle"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            {/* Previous */}
            <Button
              data-player-control
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
              onClick={playPrevious}
              disabled={!currentSong}
              aria-label="Previous song"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            {/* Play / Pause */}
            <Button
              data-player-control
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 transition-transform duration-200 hover:scale-110 active:scale-90"
              onClick={togglePlay}
              disabled={!currentSong}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            {/* Next */}
            <Button
              data-player-control
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
              onClick={playNext}
              disabled={!currentSong}
              aria-label="Next song"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            {/* Repeat */}
            <Button
              data-player-control
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
              aria-label="Repeat"
            >
              <Repeat className="h-4 w-4" />
            </Button>

          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2 w-full min-w-0">

            <div className="shrink-0 whitespace-nowrap tabular-nums text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>

            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="min-w-0 flex-1 hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />

            <div className="shrink-0 whitespace-nowrap tabular-nums text-xs text-zinc-400">
              {formatTime(duration)}
            </div>

          </div>
        </div>

        {/* Volume Controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-45 w-[30%] justify-end">

          <Button
            data-player-control
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
            aria-label="Lyrics"
          >
            <Mic2 className="h-4 w-4" />
          </Button>

          <Button
            data-player-control
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
            aria-label="Queue"
          >
            <ListMusic className="h-4 w-4" />
          </Button>

          <Button
            data-player-control
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
            aria-label="Connect to a device"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>

          {/* Volume */}
          <div className="flex items-center gap-2">

            <Button
              data-player-control
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
              aria-label="Volume"
            >
              <Volume1 className="h-4 w-4" />
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              orientation="horizontal"
              aria-label="Volume level"
              className="w-25 min-w-25 shrink-6 hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleVolumeChange}
            />

          </div>
        </div>

      </div>
    </footer>
  );
};

export default PlaybackControls;

