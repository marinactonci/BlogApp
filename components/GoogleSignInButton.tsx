"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import GoogleImage from "@/public/google.svg";

function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };
  return (
    <Button onClick={handleClick} className="flex bg-blue-500 hover:bg-blue-600 items-center gap-2">
      <Image src={GoogleImage} alt="Google" width={20} height={20} />
      <span>Login</span>
    </Button>
  );
}

export default GoogleSignInButton;
