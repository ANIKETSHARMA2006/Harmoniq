import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import type { Song } from "@/types"
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};

	return (
		<Button
			size={"lg"}
			aria-label={isCurrentSong && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
			onClick={(event) => {
				event.stopPropagation();
				handlePlay();
			}}
			className={`hidden absolute bottom-6 right-2 rounded-full bg-white text-black shadow-lg shadow-black/30 transition-all sm:inline-flex sm:opacity-0 sm:translate-y-2 hover:scale-105 hover:bg-zinc-200 sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 sm:group-hover:translate-y-0 ${
					isCurrentSong ? "sm:opacity-100 sm:translate-y-0" : ""
				}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className='size-5 text-black' />
			) : (
				<Play className='size-5 text-black' />
			)}
		</Button>
	);
};

export default PlayButton
