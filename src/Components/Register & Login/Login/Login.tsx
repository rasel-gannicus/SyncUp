"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@/utils/firebase.init";
import { toast } from "react-hot-toast";
import SocialLogin from "../Social Login/SocialLogin";
import Link from "next/link";
import { withAuthRedirect } from "@/utils/Route Protection/RouteProtection";
import { LoadingSpinner } from "@/utils/Loading Spinner/LoadingSpinner";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Firebase hook for creating a user with email and password
  const [signIn, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

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
      // Log any errors that occur during account creation
      console.error(err);
      // Display an error toast if account creation fails
      toast.error("Error creating account", { position: "bottom-right" });
    } finally {
      // Set loading state to false regardless of success or failure
      setIsLoading(false);
    }
  };

  // Use effect hook to manage toast messages based on loading, error, and user states
  useEffect(() => {
    let toastId: any;
    // Show a loading toast while account creation is in progress
    if (loading) {
      toastId = toast.loading("Logging in...", {
        position: "bottom-right",
      });
      // Show an error toast if an error occurs during account creation
    } else if (error) {
      toast.error(error.message || "Error Logging in", {
        position: "bottom-right",
      });
      // Show a success toast if the account is created successfully
    } else if (user) {
      toast.success("Logged in successfully!", {
        position: "bottom-right",
      });
    }
    // Dismiss the loading toast when the component unmounts or updates
    return () => toast.dismiss(toastId);
  }, [loading, error, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-600 mt-2">
              Keep your progress in one place!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <Button
              type="submit"
              className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ${
                loading && "opacity-50 pointer-events-none"
              }`}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Login"}
            </Button>
          </form>

          <SocialLogin isLoading={isLoading} />

          <p className="mt-6 text-center text-sm text-gray-600">
            {`Don't have an account ? `}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withAuthRedirect(Login);
