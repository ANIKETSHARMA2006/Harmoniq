import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { SignOutButton, useAuth } from '@clerk/react';
import { Link } from 'react-router-dom'
import SignInOAuthButtons from './SignInOAuthButtons';

const Topbar = () => {
    const isAdmin = false;
    const { isSignedIn } = useAuth();
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
