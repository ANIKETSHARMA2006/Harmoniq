import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { SignOutButton, useAuth } from '@clerk/react';
import { Link } from 'react-router-dom'
import SignInOAuthButtons from './SignInOAuthButtons';
import axiosInstance from '@/lib/axios';

const Topbar = () => {
    const { isSignedIn } = useAuth();
    const [adminCheck, setAdminCheck] = React.useState<boolean | null>(null);
    const isAdmin = Boolean(isSignedIn && adminCheck);
    // Old code: const isAdmin = false;

    React.useEffect(() => {
      let active = true;

      if (!isSignedIn) {
        return () => { active = false; };
      }

      axiosInstance.get('/admin/check')
        .then(() => {
          if (active) setAdminCheck(true);
        })
        .catch(() => {
          if (active) setAdminCheck(false);
        });

      return () => { active = false; };
    }, [isSignedIn]);
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 text-white backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        Harmoniq
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
            <Link to={"/admin"} >
                <LayoutDashboardIcon className="size-4 mr-2" />
              Admin Dashboard
            </Link>
        )}
        {isSignedIn && <SignOutButton />}
        {!isSignedIn && <SignInOAuthButtons />}
             
      </div>
    </div>
  )
}

export default Topbar
