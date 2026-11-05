import { useSignIn } from '@clerk/react/legacy';
import { Button } from "@/components/ui/button"

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn();

    if (!isLoaded) return;
    

    const signInWithGoogle = async () => {
        await signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback",
        });
    }

  return (
    <Button onClick={signInWithGoogle} variant={"ghost"} className="w-auto justify-center border-zinc-200 px-2 text-xs text-white sm:px-3 sm:text-sm">Continue with Google</Button>

  )
}

export default SignInOAuthButtons
