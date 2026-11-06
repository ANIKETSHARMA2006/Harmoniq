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
    <div className='mb-8 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					onClick={() => playSongFromCard(song._id)}
					onKeyDown={(event) => handleCardKeyDown(event, song._id)}
					role="button"
					tabIndex={0}
					aria-label={`Play ${song.title} by ${song.artist}`}
					className='group relative flex min-w-0 items-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.04]
		         shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.08] hover:shadow-emerald-950/20'
				>
					<div className='h-16 w-16 shrink-0 overflow-hidden bg-zinc-900 sm:h-24 sm:w-24'>
						<img
							src={song.imageUrl}
							alt={song.title}
							className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
						/>
					</div>
					<div className='min-w-0 flex-1 p-2 sm:p-4 sm:pr-12'>
						<p className='truncate text-sm font-medium sm:text-base'>{song.title}</p>
						<p className='truncate text-sm text-zinc-400'>{song.artist}</p>
					</div>
					<PlayButton song={song}/>
				</div>
			))}
		</div>
  )
}

export default FeaturedSection
