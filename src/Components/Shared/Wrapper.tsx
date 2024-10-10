"use client" ;
import { setTheme } from "@/Redux/features/Darkmode/themeSlice";
import Sidebar from "./Navbar/Sidebar";
import Topbar from "./Navbar/Topbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();

  useEffect(() => {

    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    dispatch(setTheme(savedTheme)); // Set the theme based on saved preference
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Topbar />
        <main className="grid ">{children}</main>
      </div>
    </div>
  );
}
