import { useAuth } from "@clerk/react";
import axiosInstance from "../lib/axios";
import { Loader } from "lucide-react";
import  { useState, useEffect } from 'react'
import { useAuthStore } from "@/store/useAuthStore";



const updateApiToken = (token: string| null) =>  {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } 
  else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken, isLoaded, isSignedIn} = useAuth();
    const [loading, setLoading] = useState(true);
    const { checkAdminStatus, reset } = useAuthStore();

    useEffect(() => {
      if (!isLoaded) return;

      let cancelled = false;

      const initAuth = async () => {
        setLoading(true);

        if (!isSignedIn) {
          updateApiToken(null);
          reset();
          setLoading(false);
          return;
        }

        try {
          const token = await getToken();
          if (cancelled) return;

          updateApiToken(token);
          if (token) {
            await checkAdminStatus(token);
          }
        } catch (error) {
          updateApiToken(null);
          console.error("Error fetching token:", error);
        } finally {
          if (!cancelled) setLoading(false);
        }
      };
      initAuth();
      return () => {
        cancelled = true;
      };
    }, [getToken, isLoaded, isSignedIn, checkAdminStatus, reset]);
 if(loading) return (<div className="h-screen w-full flex items-center justify-center"><Loader className="size-8 text-white animate-spin" /></div>);
 return (
    <div>
      {children}
    </div>
  )
}
export default AuthProvider
