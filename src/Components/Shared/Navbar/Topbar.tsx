"use client";
import {
  AlarmClockCheck,
  Home,
  LucideListTodo,
  Notebook,
  PanelLeft,
  Search,
} from "lucide-react";
import Image from "next/image";

import {
  useAddUserToDbMutation,
  useGetUserQuery,
} from "@/Redux/features/user/userApi";
import {
  addUserLoading,
  addUserToRedux,
} from "@/Redux/features/user/userSlice";
import { useAppDispatch } from "@/Redux/hooks";
import profileImg from "@/assets/img/profile-svgrepo-com.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/utils/Dark mode toggle/ThemeToggle";
import { HomePageLoading } from "@/utils/Loading Spinner/Loading Skeleton/Skeleton";
import { DeleteConfirmationModal } from "@/utils/Modals/DeleteConfirmationModal";
import { NavLink } from "@/utils/Navlink/NavLink";
import { useAuthState } from "@/utils/Route Protection/useAuthState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaSackDollar } from "react-icons/fa6";
import { IoMdKey, IoMdLogIn } from "react-icons/io";
import MiniMenuCardIcon from "./MiniMenuCardIcon";

const Topbar = () => {
  const [isModal, setIsModal] = useState(false);

  const { user, loading } = useAuthState(); // get user from firebase

  const [addUserToDb] = useAddUserToDbMutation();

  const { data: userFromDB, isLoading } = useGetUserQuery(
    user?.providerData[0]?.email || user?.email
  ); // get user from db

  const dispatch = useAppDispatch(); // redux dispatch

  useEffect(() => {
    if (userFromDB) {
      dispatch(addUserToRedux(userFromDB));
    }
    dispatch(addUserLoading(isLoading));
  }, [userFromDB, user, isLoading]);

  const handleUser = async (user: any, provider: string) => {
    // console.log("triggered");
    if (user) {
      try {
        const response = await addUserToDb({
          user: {
            ...user,
            name: user?.displayName || user?.providerData[0]?.displayName || "",
            email: user?.providerData[0]?.email || user?.email,
            uid: user?.uid || null,
            provider: provider,
          },
        });

        if ("error" in response) {
          throw new Error("Failed to save user data to database");
        }

        toast.success(`You are signed in`);
      } catch (error) {
        console.error("Error saving user data:", error);
        toast.error(`Error saving user data after ${provider} sign-in`);
      }
    }
  };

  useEffect(() => {
    if (user) {
      handleUser(user, user.providerData[0].providerId);
    }
  }, [user]);

  const navigate = useRouter();

  if (loading) {
    return <HomePageLoading />;
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs ">
          <nav className="grid gap-6 text-lg font-medium mt-20">
            <NavLink
              href="/"
              className="flex items-center gap-4 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground [&.active]:bg-blue-100   [&.active]:text-black"
            >
              <Home className="h-5 w-5" />
              Home
            </NavLink>

            <NavLink
              href="/finance-tracker"
              className="flex items-center gap-4 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground [&.active]:bg-blue-100   [&.active]:text-black"
              prefetch={true}
            >
              <FaSackDollar className="h-5 w-5" />
              <span className=" ">Finance Tracker</span>
            </NavLink>

            <NavLink
              href="/habit-tracker"
              className="flex items-center gap-4 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground [&.active]:bg-blue-100   [&.active]:text-black"
              prefetch={true}
            >
              <AlarmClockCheck className="h-5 w-5" />
              <span className=" ">Habit Tracker</span>
            </NavLink>

            <NavLink
              href="/notepad"
              className="flex items-center gap-4 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground [&.active]:bg-blue-100   [&.active]:text-black"
              prefetch={true}
            >
              <Notebook className="h-5 w-5" />
              <span className=" ">Notepad</span>
            </NavLink>

            <NavLink
              href="/todoList"
              className="flex items-center gap-4 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground [&.active]:bg-blue-100   [&.active]:text-black"
              prefetch={true}
            >
              <LucideListTodo className="h-5 w-5" />
              <span className=" ">Todo List</span>
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>

      {/* --- Search --- */}
      <MiniMenuCardIcon />

      {/* --- Darkmode toggle --- */}
      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full w-10 h-10"
          >
            <Image
              src={user?.providerData[0].photoURL || profileImg}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {user?.providerData[0].displayName || "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="text-xs text-gray-400">
              {user?.providerData[0]?.email || user?.email}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate.push("/secretPage")}
            className="text-red-600 font-bold"
          >
            Secret Page
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          {!user ? (
            <DropdownMenuItem>
              <Link
                className="bg-teal-500 px-3 rounded py-2 flex justify-center items-center gap-1 text-white me-2 "
                href="/login"
              >
                <IoMdLogIn />
                Login
              </Link>
              <Link
                className="bg-slate-400 px-3 rounded py-2 flex justify-center items-center gap-1 text-white "
                href="/register"
              >
                <IoMdKey className="text-lg" />
                Register
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Button onClick={() => setIsModal(true)} className="bg-pink-600">
                Logout
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationModal isModal={isModal} setIsModal={setIsModal} />
    </header>
  );
};

export default Topbar;
