import { Button } from "@/components/ui/button";
import auth from "@/utils/firebase.init";
import { Github } from "lucide-react";
import { useEffect } from "react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function SocialLogin({ isLoading }: { isLoading: boolean }) {
  // sign up with 'google'
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  // sign up with 'google'
  const [signInWithGithub, gitUser, gitLoading, gitError] =
    useSignInWithGithub(auth);

  useEffect(() => {
    // console.log({ gitUser, gitLoading, gitError });
    if (!loading && !gitLoading && (error || gitError)) {
      console.log({ error, gitError });
      toast.error(gitError?.code || error?.code || "An error happened");
    }
  }, [gitUser, gitLoading, gitError, user, loading, error]);
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button
          onClick={() => signInWithGithub()}
          variant="outline"
          disabled={isLoading}
          className="w-full"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button
          onClick={() => signInWithGoogle()}
          variant="outline"
          disabled={isLoading}
          className="w-full"
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  );
}
