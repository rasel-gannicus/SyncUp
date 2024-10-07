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
import { useAddUserToDbMutation } from "@/Redux/features/user/userApi";
import { toast } from "react-hot-toast";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "@/Redux/features/user/userSlice";

const Topbar = () => {
  const [isModal, setIsModal] = useState(false);

  const { user, loading } = useAuthState();
  const userFromReduxStore = useSelector(selectUser);
  console.log(userFromReduxStore)

  const [addUserToDb] = useAddUserToDbMutation();

  const handleUser = async (user: any, provider: string) => {
    console.log("triggered");
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

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex">
        <DynamicBreadcrumb />
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
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
