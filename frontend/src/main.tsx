import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/Home/HomePage.tsx'
import AuthCallbackPage from './pages/Auth-callback/AuthCallbackPage.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import AuthProvider from './providers/AuthProvider.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth-callback",
    element: <AuthCallbackPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </ClerkProvider>
  </StrictMode>,
)
