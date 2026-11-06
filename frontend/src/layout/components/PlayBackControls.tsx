
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/usePlayerStore";

import {
  Bluetooth,
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
      className="min-h-27 shrink-0 rounded-2xl border border-white/10 bg-black px-2 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl md:h-20 md:min-h-0 md:rounded-xl md:border-t md:border-x-0 md:border-b-0 md:px-4 md:py-0"
    >
      <div className="mx-auto hidden h-full max-w-[1800px] flex-col justify-center gap-0 md:flex md:flex-row md:items-center md:justify-between md:gap-0">

        {/* Currently Playing Song */}
        <div
          ref={songInfoRef}
          className="flex min-w-0 w-full items-center gap-2 md:min-w-45 md:w-[30%] md:gap-4"
        >
          {currentSong && (
            <>
              <img
                ref={albumArtRef}
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="player-album-art size-8 shrink-0 rounded-md object-cover shadow-lg md:size-12"
              />

              <div className="flex-1 min-w-0">
                <div className="song-details truncate font-medium hover:underline">
                  {currentSong.title}
                </div>

                <div className="song-details truncate text-sm text-zinc-400 hover:underline">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex w-full max-w-full flex-col items-center gap-1 md:max-w-[45%] md:gap-2">

          <div className="flex items-center gap-4 sm:gap-6">

            {/* Shuffle */}
            <Button
              data-player-control
              size="icon"
              variant="ghost"
              className="hidden md:inline-flex hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
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
              className="hidden md:inline-flex hover:text-white text-zinc-400 transition-transform duration-200 hover:scale-110 active:scale-90"
              aria-label="Repeat"
            >
              <Repeat className="h-4 w-4" />
            </Button>

          </div>

          {/* Progress Bar */}
          <div className="flex w-full min-w-0 items-center gap-2 pb-1 md:pb-0">

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
        <div className="hidden min-w-45 w-[30%] items-center justify-end gap-4 md:flex">

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

      {/* Compact mobile player */}
      <div className="relative flex h-full min-h-[92px] items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 px-2.5 pb-4 pt-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:hidden">
        {currentSong ? (
          <img
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="player-album-art size-[68px] shrink-0 rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="size-[68px] shrink-0 rounded-lg bg-zinc-900" />
        )}

        <div className="min-w-0 flex-1 px-1 text-center">
          <div className="song-details truncate text-[15px] font-semibold text-zinc-100">
            {currentSong?.title ?? "Nothing playing"}
          </div>
          <div className="song-details flex min-w-0 items-center justify-center gap-1.5 truncate text-xs text-emerald-400">
            <Bluetooth className="size-4 shrink-0" />
            <span className="truncate">{currentSong?.artist ?? "Choose a song to start listening"}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 text-emerald-400">
          <Button
            data-player-control
            size="icon"
            variant="ghost"
            onClick={playPrevious}
            disabled={!currentSong}
            className="size-9 rounded-full text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300"
            aria-label="Previous song"
          >
            <SkipBack className="size-5" />
          </Button>

          <Button
            data-player-control
            size="icon"
            variant="ghost"
            onClick={playNext}
            disabled={!currentSong}
            className="size-9 rounded-full text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300"
            aria-label="Next song"
          >
            <SkipForward className="size-5" />
          </Button>

          <Button
            data-player-control
            size="icon"
            className="size-10 rounded-full bg-white text-black hover:bg-zinc-200"
            onClick={togglePlay}
            disabled={!currentSong}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
          </Button>
        </div>

        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          disabled={!currentSong}
          aria-label="Playback progress"
          className="absolute inset-x-2.5 bottom-1.5 h-2 [&_[data-slot=slider-range]]:bg-emerald-400 [&_[data-slot=slider-thumb]]:size-2"
          onValueChange={handleSeek}
        />
      </div>
    </footer>
  );
};

export default PlaybackControls;

