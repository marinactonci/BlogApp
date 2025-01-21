// app/users/[id]/page.tsx

import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return notFound();
  }

  // Fetch the user, their blogs, and their comments
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      blogs: true,
      comments: {
        include: {
          blog: true, // Include the blog associated with each comment
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-6">Profile: {user.name}</h1>

      {/* User Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Name: {user.name}</p>
      </div>

      {/* User Blogs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Blogs</h2>
        {user.blogs.length === 0 ? (
          <p className="text-gray-600">User hasn&apos;t posted any blogs yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {user.blogs.map((blog) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className="group">
                <div className="p-4 border rounded-lg group-hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-gray-600">
                    {blog.content.slice(0, 100)}...
                  </p>
                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <span>Posted on: </span>
                    <div className="space-x-1">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("de-DE")}
                      </span>
                      <time dateTime={new Date(blog.createdAt).toISOString()}>
                        {new Date(blog.createdAt).toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Users Comments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {user.comments.length === 0 ? (
          <p className="text-gray-600">No comments found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {user.comments.map((comment) => (
              <div key={comment.id} className="p-4 border rounded-lg">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  On blog:{" "}
                  <a
                    href={`/blogs/${comment.blogId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {comment.blog.title}
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  Posted at:{" "}
                  {new Date(comment.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
