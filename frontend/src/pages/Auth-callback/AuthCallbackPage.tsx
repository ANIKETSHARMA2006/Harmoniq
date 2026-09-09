import { Card, CardContent } from '@/components/ui/card'
import axiosInstance from '@/lib/axios'
import { useAuth, useUser } from '@clerk/react'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallbackPage = () => {

  const {isLoaded, user} = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [syncError, setSyncError] = useState<string | null>(null);
  useEffect(()=>{
    const syncUser = async()=>{
      try {
        if(!isLoaded) return;
        if(!user) {
          navigate("/");
          return;
        }
        const token = await getToken();
        if (!token) throw new Error("Clerk session token is unavailable");
        await axiosInstance.post("/auth/callback",{
          id: user?.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/");
      } catch (error) {
        console.error("Error in auth callback", error);
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message || `Request failed (${error.response?.status ?? "unknown"})`
          : "User sync failed. Please refresh and try again.";
        setSyncError(message);
      }
    };
    syncUser()
  },[getToken,isLoaded,user,navigate])

  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
      <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
        <CardContent className='flex flex-col items-center mx-auto text-center gap-4 pt-6'>
        <Loader className='size-6 mx-auto text-white animate-spin' />
        <h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
        <p className='text-zinc-400 text-sm'>Redirecting...</p>
        {syncError && <p className='text-red-400 text-sm'>{syncError}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallbackPage

// Old code: if(!isLoaded || !user) return; followed by navigate("/") in finally.
