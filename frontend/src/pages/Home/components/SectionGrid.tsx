import type { Song } from "@/types"
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import type { KeyboardEvent } from "react";
import PlayButton from "./PlayButton";
type SectionGridProp = {
    title: string;
    songs: Song[];
    isLoading: boolean;
}
const SectionGrid = ({title,songs,isLoading}:SectionGridProp) => {
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong)

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, song: Song) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setCurrentSong(song)
    }
  }

  if(isLoading) return <SectionGridSkeleton />
    
  return (
    <div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
				<Button variant='link' className='text-sm text-zinc-400 hover:text-white'>
					Show all
				</Button>
			</div>

			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4'>
				{songs.map((song) => (
					<div
						key={song._id}
						onClick={() => setCurrentSong(song)}
						onKeyDown={(event) => handleCardKeyDown(event, song)}
						role="button"
						tabIndex={0}
						aria-label={`Play ${song.title} by ${song.artist}`}
						className='group min-w-0 cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-white/[0.035] p-3 transition-all hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/20 sm:p-4'
					>
						<div className='relative mb-4'>
							<div className='aspect-square w-full overflow-hidden rounded-lg bg-zinc-900 shadow-lg ring-1 ring-white/5'>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
								/>
							</div>
							<PlayButton song={song}/>
						</div>
						<h3 className='mb-2 min-w-0 truncate font-medium'>{song.title}</h3>
						<p className='min-w-0 truncate text-sm text-zinc-400'>{song.artist}</p>
					</div>
				))}
			</div>
		</div>
  )
}

export default SectionGrid
