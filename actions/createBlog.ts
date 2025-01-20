// actions/createBlog.ts

"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorId = formData.get("authorId") as string;
  const categoryIds = formData.getAll("categories").map((id) => Number(id));

  // Validate input
  if (!title || !content || !authorId || categoryIds.length === 0) {
    throw new Error("All fields are required");
  }

  // Create the blog in the database
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      authorId: parseInt(authorId),
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
  });

  // Revalidate to the new blog
  revalidatePath(`/blogs/${blog.id}`);

  // Redirect to the new blog
  return redirect(`/blogs/${blog.id}`);
}
