import { useAuth } from "@clerk/react";
import { setTokenProvider } from "../lib/axios";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from "@/store/useAuthStore";

const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken, isLoaded, isSignedIn} = useAuth();
    const [loading, setLoading] = useState(true);
    const { checkAdminStatus, reset } = useAuthStore();

    const getApiToken = useCallback(async () => {
      if (!isLoaded || !isSignedIn) return null;
      return getToken();
    }, [getToken, isLoaded, isSignedIn]);

    // Register the provider instead of storing one token in Axios defaults.
    // Clerk can then refresh an expired token after the tab has been idle.
    useEffect(() => {
      setTokenProvider(isLoaded && isSignedIn ? getApiToken : null);

      return () => setTokenProvider(null);
    }, [getApiToken, isLoaded, isSignedIn]);

    useEffect(() => {
      if (!isLoaded) return;

      let cancelled = false;

      const initAuth = async () => {
        setLoading(true);

        if (!isSignedIn) {
          reset();
          setLoading(false);
          return;
        }

        try {
          const token = await getToken();
          if (cancelled) return;

          if (token) {
            await checkAdminStatus(token);
          }
        } catch {
          reset();
        } finally {
          if (!cancelled) setLoading(false);
        }
      };
      initAuth();
      return () => {
        cancelled = true;
      };
    }, [getToken, isLoaded, isSignedIn, checkAdminStatus, reset]);
 if(loading) return (<div className="flex h-dvh w-full items-center justify-center"><Loader className="size-8 text-white animate-spin" /></div>);
 return (
    <div>
      {children}
    </div>
  )
}
export default AuthProvider
