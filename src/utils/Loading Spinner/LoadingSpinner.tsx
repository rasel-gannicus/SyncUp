"use client";
import { cn } from "@/lib/utils";
import { LoaderIcon, LoaderPinwheel, LoaderCircle } from "lucide-react";

export const LoadingSpinner = () => {
    return (
      <div className="w-full min-h-[70vh] flex flex-col gap-3 justify-center items-center">
        <LoaderPinwheel className="animate-spin size-10 text-gray-500" />
        <p className="text-2xl text-gray-500 font-semibold">Loading . . . </p>
      </div>
    );
  };
  

interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LoadingSpinnerCustom = ({
  size = 44,
  className,
  ...props
}: ISVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
