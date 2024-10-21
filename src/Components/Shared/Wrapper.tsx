"use client" ;
import { setTheme } from "@/Redux/features/Darkmode/themeSlice";
import Sidebar from "./Navbar/Sidebar";
import Topbar from "./Navbar/Topbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSystemTheme } from "@/utils/Dark mode toggle/useSystemTheme";

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';

    if (savedTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      dispatch(setTheme(savedTheme)); // Apply saved theme
    }
  }, [dispatch]);
  useSystemTheme() ;

  return (
    <div className="flex min-h-[90vh] dark:bg-gray-900 w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:pt-4 sm:pl-14">
        <Topbar />
        <main className="grid ">{children}</main>
      </div>
    </div>
  );
}
