"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Power } from "lucide-react";

function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="flex items-center gap-4">
      <Power className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutButton;
