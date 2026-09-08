import { useSignIn } from '@clerk/react/legacy';
import { Button } from "@/components/ui/button"
// Old import: import { Button } from "@/components/ui/Button"

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
    <Button onClick={signInWithGoogle} variant={"ghost"} className= " w-full text-white border-zinc-200 justify-center">Continue with Google</Button>

  )
}

export default SignInOAuthButtons
