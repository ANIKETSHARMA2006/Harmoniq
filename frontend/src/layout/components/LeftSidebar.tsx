import { Link } from 'react-router-dom'
import { useAuth } from "@clerk/react";
import { HomeIcon, Library, Loader, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import PlaylistSkeleton from '@/components/skeletons/PlaylistSkeleton';


const LeftSidebar = () => {
    const isLoading = true
    const { isSignedIn } = useAuth();
  return (
    <div className='h-full flex flex-col gap-2'>
    {/* navigation menu */}

        <div className='rounded-lg bg-zinc-900 p-4'>
            <div className='space-y-2 '>
                <Link to={"/"}
                className={cn(buttonVariants(
                    {
                        variant:"ghost",
                        className:"w-full justify-start text-white hover:bg-zinc-800"
                    }
                ))}
                >
                <HomeIcon className='mr-2 size-5 '/>
                <span className='hidden md:inline'>Home</span>
                </Link>

                 {isSignedIn ? <Link to={"/chat"}
                className={cn(buttonVariants(
                    {
                        variant:"ghost",
                        className:"w-full justify-start text-white hover:bg-zinc-800"
                    }
                ))}
                >
                <MessageCircle className='mr-2 size-5'/>
                <span className='hidden md:inline'>Messages</span>
                </Link>: null}
            </div>

        </div>
    
    {/* library section */}
    <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center text-white px-2'>
                <Library className='size-5 mr-2'/>
                <span className='hidden md:inline'>Playlist</span>
            </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)] ">
            <div className='space-y-2'>
                { isLoading ? (
                    <PlaylistSkeleton/>
                ):null }
            </div>
        </ScrollArea>
    </div>
                
    </div>
  )
}

export default LeftSidebar
