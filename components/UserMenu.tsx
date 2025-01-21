import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authConfig } from "@/lib/auth";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import prisma from "@/lib/db";

async function UserMenu() {
  const session = await getServerSession(authConfig);

  // Return null if no session or email
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {
      id: true,
    },
  });

  // Return null if user not found
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!rounded-full">
        {session?.user?.image && (
          <img
            src={session?.user?.image}
            alt={
              session?.user?.name
                ? session?.user?.name + " profile image"
                : "User profile image"
            }
            className="rounded-full overflow-hidden"
            width={40}
            height={40}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/authors/${user?.id}`}
            className="flex items-center gap-4"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
