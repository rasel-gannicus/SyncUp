"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomLoadingSpinner } from "@/utils/Loading Spinner/Loading Skeleton/Skeleton";
import { withAuthRedirect } from "@/utils/Route Protection/RouteProtection";
import auth from "@/utils/firebase.init";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SocialLogin from "../Social Login/SocialLogin";
import loginPagePic from '@/assets/img/login page pics.png'
import Image from "next/image";


function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleAutofillCredentials = () => {
    setEmail('rasel@gmail.com');
    setPassword('aaaaaa');
  };

  // Firebase hook for creating a user with email and password
  const [signIn, user, loading, error] = useSignInWithEmailAndPassword(auth);

  // Function to handle form submission for registration
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Check if password meets minimum length requirement
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        position: "bottom-right",
      });
    }

    setIsLoading(true);
    try {
      // Attempt to create user with email and password using Firebase
      await signIn(email, password);
    } catch (err) {
      toast.error("Error creating account", { position: "bottom-right" });
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect hook to manage toast messages based on loading, error, and user states
  useEffect(() => {
    let toastId: any;
    if (loading) {
      toastId = toast.loading("Logging in...", {
        position: "bottom-right",
      });
    } else if (error) {
      toast.error(error.message || "Error Logging in", {
        position: "bottom-right",
      });
    } else if (user) {
      toast.success("Logged in successfully!", {
        position: "bottom-right",
      });
    }
    // Dismiss the loading toast when the component unmounts or updates
    return () => toast.dismiss(toastId);
  }, [loading, error, user]);

  return (
    <div className="min-h-screen h-full w-full bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full flex">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          {/* Login/Signup Tabs */}
          <div className="flex gap-8 mb-8">
            <button className="text-[#00A9A5] text-xl font-semibold border-b-2 border-[#00A9A5] pb-2">Login</button>
            <Link href="/register" className="text-gray-400 text-xl">Sign up</Link>
          </div>

          {/* Test Credentials */}
          <div className="text-gray-400 mb-8 text-center">
            <p> --- You may try this credential for testing: --- </p>
            <p className="text-sm text-slate-600"> Email: rasel@gmail.com</p>
            <p className="text-sm text-slate-600">Password: aaaaaa</p>
            <Button
              className={`mt-3 bg-gray-400 text-white font-semibold py-3 rounded-md hover:bg-gray-600 duration-100 ${loading && "opacity-50 pointer-events-none"
                }`}
              disabled={loading}
              onClick={handleAutofillCredentials}
            >
              {loading ? <CustomLoadingSpinner /> : "Auto fill this credential"}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or phone number"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg pl-10"
                  disabled={isLoading}
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {/* Email icon placeholder */}
                  <MdEmail className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg pl-10"
                  disabled={isLoading}
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {/* Password icon placeholder */}
                  <FaUnlock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link href="/forgot-password" className="text-[#00A9A5]">
                Forgot your password?
              </Link>
              <Button
                type="submit"
                className="px-8 py-2 bg-[#00A9A5] text-white rounded-lg hover:bg-[#008B87] transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span>Loading</span>
                    <CustomLoadingSpinner />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          <SocialLogin isLoading={isLoading} />
        </div>

        {/* Right side - Illustration container with circles */}
        <div className="hidden md:block w-1/2 bg-[#E5F6F6] relative overflow-hidden">
          {/* Largest circle */}
          <div className="absolute right-0 top-0 bottom-0 w-[90%] bg-[#00A9A5] rounded-l-full opacity-10" />
          {/* Medium circle */}
          <div className="absolute right-0 top-0 bottom-0 w-[80%] bg-[#00A9A5] rounded-l-full opacity-20" />
          {/* Smallest circle */}
          <div className="absolute right-0 top-0 bottom-0 w-[60%] bg-[#00A9A5] rounded-l-full opacity-30" />
          {/* Robot AI Image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* <Image
              src={loginPagePic} 
              alt="Login Page Pic" 
              className="w-2/3 h-auto object-contain"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthRedirect(Login);
