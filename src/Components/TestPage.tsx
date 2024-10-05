"use client";

import { withAuthProtection } from "@/utils/Route Protection/RouteProtection";

function TestPage() {
  return (
    <div>
      <h2>Only logged in user can see that page ... </h2>
    </div>
  );
}

export default withAuthProtection(TestPage);