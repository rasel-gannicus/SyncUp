"use client";
import { LoaderIcon, Loader2, Loader, LoaderCircle, LoaderPinwheel, LoaderPinwheelIcon, LucideLoaderCircle } from "lucide-react";

import { withAuthProtection } from "@/utils/Route Protection/RouteProtection";
import { LoadingSpinner } from "@/utils/Loading Spinner/LoadingSpinner";

const TestPage = () => (
  // Use arrow function for conciseness
  <div>
    <h2 className="">Only logged in user can see that page ... </h2>
  </div>
);
export default withAuthProtection(TestPage);
