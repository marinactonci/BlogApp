import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            Blog App
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 hover:text-gray-600"
          >
            Home
          </Link>
          <Link
            href="/blogs/create"
            className="text-lg font-semibold text-gray-800 hover:text-gray-600"
          >
            Create Blog
          </Link>
          {session?.user ? (
            <UserMenu />
          ) : (
            <GoogleSignInButton />
          )}
        </div>
      </div>
    </nav>
  );
}
