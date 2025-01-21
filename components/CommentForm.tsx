// components/CommentForm.tsx
import { postComment } from "@/actions/postComment";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import LoginLink from "./LoginLink";
import prisma from "@/lib/db";

interface CommentFormProps {
  blogId: number;
}

export default async function CommentForm({ blogId }: CommentFormProps) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return <LoginLink />;
  }

  // Check for email existence first
  if (!session.user?.email) {
    return <div className="text-red-500">Email not found in session</div>;
  }

  // Fetch the user from the database using the email from the session
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <form action={postComment} className="mt-6">
      <input type="hidden" name="authorId" value={user.id} />
      <input type="hidden" name="blogId" value={blogId} />
      <textarea
        name="content"
        placeholder="Write your comment..."
        className="w-full p-2 border rounded-lg"
        required
      />
      <Button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Post Comment
      </Button>
    </form>
  );
}
