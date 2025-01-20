// actions/createComment.ts

"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function postComment(formData: FormData) {
  const content = formData.get("content") as string;
  const authorId = formData.get("authorId") as string;
  const blogId = formData.get("blogId") as string;

  // Validate input
  if (!content || !authorId || !blogId) {
    throw new Error("All fields are required");
  }

  // Create the comment in the database
  await prisma.comment.create({
    data: {
      content,
      authorId: parseInt(authorId),
      blogId: parseInt(blogId),
    },
  });

  // Revalidate the blog page to reflect the new comment
  revalidatePath(`/blogs/${blogId}`);
}
