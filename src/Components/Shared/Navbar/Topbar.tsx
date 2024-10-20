"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
  AlarmClockCheck,
  Coins,
  LucideListTodo,
  Notebook,
  Settings,
} from "lucide-react";

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
import profileImg from "@/assets/img/profile-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { DeleteConfirmationModal } from "@/utils/Modals/DeleteConfirmationModal";
import { useAuthState } from "@/utils/Route Protection/useAuthState";
import { useRouter } from "next/navigation";
import {
  useAddUserToDbMutation,
  useGetUserQuery,
} from "@/Redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  addUserLoading,
  addUserToRedux,
} from "@/Redux/features/user/userSlice";
import { LoadingSpinner } from "@/utils/Loading Spinner/LoadingSpinner";
import { useAppDispatch } from "@/Redux/hooks";
import ThemeToggle from "@/utils/Dark mode toggle/ThemeToggle";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { NavLink } from "@/utils/Navlink/NavLink";
import { FaSackDollar } from "react-icons/fa6";

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
    return <LoadingSpinner />;
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
              <span className=" ">
                Finance Tracker
              </span>
            </NavLink>

            <NavLink
              href="/habit-tracker"
              className="flex items-center gap-4 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground [&.active]:bg-blue-100   [&.active]:text-black"
              prefetch={true}
            >
              <AlarmClockCheck className="h-5 w-5" />
              <span className=" ">
                Habit Tracker
              </span>
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
              <span className=" ">
                Todo List
              </span>
            </NavLink>

            
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex">{/* <DynamicBreadcrumb /> */}</div>

      {/* --- Search --- */}
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

      {/* --- Darkmode toggle --- */}
      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
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
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate.push("/secretPage")}
            className="text-red-600 font-bold"
          >
            Secret Page
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user ? (
            <DropdownMenuItem onClick={() => setIsModal(true)}>
              Logout
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => navigate.push("/login")}>
              Login
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationModal isModal={isModal} setIsModal={setIsModal} />
    </header>
  );
};

export default Topbar;
