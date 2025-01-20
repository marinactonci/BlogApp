"use client";

import { signIn } from "next-auth/react";
import React from "react";

function LoginLink() {
  return (
    <p className="mt-6 text-gray-600">
      Please{" "}
      <button onClick={() => signIn("google")} className="text-blue-500 hover:underline">
        log in
      </button>{" "}
      to post a comment.
    </p>
  );
}

export default LoginLink;
