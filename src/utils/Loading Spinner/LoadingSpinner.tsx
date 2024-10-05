"use client";
import { cn } from "@/lib/utils";
import { LoaderIcon, LoaderPinwheel, LoaderCircle } from "lucide-react";

export const LoadingSpinner = () => {
    return (
      <div className="w-full min-h-[90vh] flex flex-col gap-3 justify-center items-center">
        <LoaderPinwheel className="animate-spin size-10 text-gray-500" />
        <p className="text-2xl text-gray-500 font-semibold">Loading . . . </p>
      </div>
    );
  };

export const LoadingSpinnerCustom = ({desc} : {desc?: string}) => {
    return (
      <div className="w-full min-h-[90vh] flex flex-col gap-3 justify-center items-center">
        <LoaderCircle className="animate-spin size-10 text-gray-500" />
        <p className="text-2xl text-gray-500 font-semibold"> {desc || 'Loading . . .'}  </p>
      </div>
    );
  };
  
