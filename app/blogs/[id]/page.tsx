// app/blogs/[id]/page.tsx

import prisma from "@/lib/db";
import CommentForm from "@/components/CommentForm";
import { redirect } from "next/navigation";
import Link from "next/link";

interface BlogDetailProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { id } = await params;
  const blogId = parseInt(id);

  if (isNaN(blogId)) {
    return <div>Invalid blog ID</div>;
  }

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: {
      author: true,
      categories: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  if (!blog) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-gray-600 mt-4">{blog.content}</p>
      <div className="mt-4">
        <span className="text-sm text-gray-500">
          By{" "}
          <Link
            href={`/authors/${blog.author.id}`}
            className="text-blue-500 hover:underline"
          >
            {blog.author.name}
          </Link>
        </span>
        <div className="text-sm text-gray-500 my-2 flex items-center gap-2">
          <span>Posted on: </span>
          <div className="space-x-1">
            <span>{new Date(blog.createdAt).toLocaleDateString("de-DE")}</span>
            <time dateTime={new Date(blog.createdAt).toISOString()}>
              {new Date(blog.createdAt).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
        </div>
        <div className="flex space-x-2 mt-1">
          {blog.categories.map((category) => (
            <span
              key={category.id}
              className="px-2 py-1 bg-gray-200 rounded-full text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentForm blogId={blogId} />
        {blog.comments.map((comment) => (
          <div key={comment.id} className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">{comment.content}</p>
            <span className="text-sm text-gray-500">
              By{" "}
              <Link
                href={`/authors/${comment.author.id}`}
                className="text-blue-500 hover:underline"
              >
                {comment.author.name}
              </Link>
            </span>
            <p className="text-sm text-gray-500">
              Commented on:{" "}
              {new Date(comment.createdAt).toLocaleDateString("de-DE")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
