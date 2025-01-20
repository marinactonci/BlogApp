// app/blogs/create/page.tsx

import { createBlog } from "@/actions/createBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/db";
import LoginLink from "@/components/LoginLink";

export default async function CreateBlogPage() {
  const session = await getServerSession(authConfig);

  // If the user is not logged in, show a login link
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold mb-6">Create a New Blog Post</h1>
        <LoginLink />
      </div>
    );
  }

  // Fetch the user from the database using the email from the session
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  // If the user is not found, show an error message
  if (!user) {
    return <div>User not found</div>;
  }

  // Fetch all categories
  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog Post</h1>
      <form action={createBlog} className="space-y-6">
        {/* Hidden input for authorId */}
        <input type="hidden" name="authorId" value={user.id} />

        {/* Title input */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Content textarea */}
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Write your blog content here..."
            rows={10}
            required
          />
        </div>

        {/* Categories checkboxes */}
        <div>
          <Label>Categories</Label>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {categories.map((category: Category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  name="categories"
                  value={category.id}
                />
                <Label htmlFor={`category-${category.id}`}>
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Create Blog</Button>
      </form>
    </div>
  );
}
