import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <div className="flex space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export const HabitTrackerLoading = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-16 w-full p-4 dark:bg-gray-700 " />
      <Skeleton className="h-16 w-full p-4 dark:bg-gray-700 " />
      <Skeleton className="h-16 w-full p-4 dark:bg-gray-700 " />
    </div>
  );
};

export const NotepadLoading = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-full w-full p-4 min-h-[300px] dark:bg-gray-700 " />
    </div>
  );
};
