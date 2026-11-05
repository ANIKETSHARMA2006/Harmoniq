

const FeaturedGridSkeleton = () => {
  return (
		<div className='grid grid-cols-2 gap-3 mb-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden animate-pulse'>
					<div className='w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 shrink-0' />
					<div className='flex-1 p-4'>
						<div className='h-4 bg-zinc-700 rounded w-3/4 mb-2' />
					</div>
				</div>
			))}
		</div>
	);
};

export default FeaturedGridSkeleton
