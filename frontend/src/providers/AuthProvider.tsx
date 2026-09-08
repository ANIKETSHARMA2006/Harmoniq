import { useAuth, useUser } from "@clerk/react";
import axiosInstance from "../lib/axios";
import { Loader } from "lucide-react";
import  { useState, useEffect } from 'react'

const updateApiToken = (token: string| null) =>  {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } 
  else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken} = useAuth();
    const {user} = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const initAuth = async () => {
        try {
          const token = await getToken();
          updateApiToken(token);
        } catch (error) {
          updateApiToken(null);
          console.error("Error fetching token:", error);
        } finally {
          setLoading(false);
        }
      };
      initAuth();
    },[getToken]);
 if(loading) return (<div className="h-screen w-full flex items-center justify-center"><Loader className="size-8 text-white animate-spin" /></div>);
 return (
    <div>
      {children}
    </div>
  )
}
export default AuthProvider