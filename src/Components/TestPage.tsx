"use client";

import { LoaderCircle } from "lucide-react";

import { withAuthProtection } from "@/utils/Route Protection/RouteProtection";

const TestPage = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl font-bold">Only logged in user can see that page ...</h2>
  </div>
);

export default withAuthProtection(TestPage);

