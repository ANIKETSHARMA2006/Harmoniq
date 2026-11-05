import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton"
import { useMusicStore } from "@/store/useMusicStore"
import { usePlayerStore } from "@/store/usePlayerStore"
import type { KeyboardEvent } from "react"
import PlayButton from "./PlayButton"

const FeaturedSection = () => {
    const {isLoading, featuredSongs, error} = useMusicStore()
    const setCurrentSong = usePlayerStore((state) => state.setCurrentSong)

    const playSongFromCard = (songId: string) => {
        const song = featuredSongs.find((item) => item._id === songId)
        if (song) setCurrentSong(song)
    }

    const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, songId: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            playSongFromCard(songId)
        }
    }

    if(isLoading) return <FeaturedGridSkeleton/>

    if(error) return <p className="text-red-500 mb-4 text-lg">{error}</p>

  return (
    <div className='grid grid-cols-2 gap-3 mb-8 sm:gap-4'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					onClick={() => playSongFromCard(song._id)}
					onKeyDown={(event) => handleCardKeyDown(event, song._id)}
					role="button"
					tabIndex={0}
					aria-label={`Play ${song.title} by ${song.artist}`}
					className='group relative flex items-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.04]
		         shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.08] hover:shadow-emerald-950/20'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-16 sm:w-20 h-16 sm:h-20 object-cover shrink-0'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{song.title}</p>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
					</div>
					<PlayButton song={song}/>
				</div>
			))}
		</div>
  )
}

export default FeaturedSection
