import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authConfig } from "@/lib/auth";
import { Power, User } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import prisma from "@/lib/db";

async function UserMenu() {
  const session = await getServerSession(authConfig);

  const userId = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {
      id: true,
    },
  });

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
            href={`/authors/${userId?.id}`}
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
