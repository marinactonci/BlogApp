import prisma from "@/lib/db";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Filters from "@/components/Filters";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    author?: string;
    title?: string;
    categories?: string;
    sort?: "asc" | "desc";
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page, author, title, categories, sort } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const blogsPerPage = 5; // Number of blogs to display per page

  // Fetch all categories for the filter dropdown
  const allCategories = await prisma.category.findMany();

  const categoryIds =
    typeof categories === "string"
      ? categories.split(",").map((id) => parseInt(id))
      : [];

  // Fetch total number of blogs (with filters applied)
  const totalBlogs = await prisma.blog.count({
    where: {
      title: title ? { contains: title, mode: "insensitive" } : undefined,
      author: author
        ? { name: { contains: author, mode: "insensitive" } }
        : undefined,
      AND: categoryIds.map((categoryId) => ({
        categories: {
          some: {
            id: categoryId,
          },
        },
      })),
    },
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  // Fetch blogs for the current page (with filters and sorting applied)
  const blogs = await prisma.blog.findMany({
    skip: (currentPage - 1) * blogsPerPage,
    take: blogsPerPage,
    where: {
      title: title ? { contains: title, mode: "insensitive" } : undefined,
      author: author
        ? { name: { contains: author, mode: "insensitive" } }
        : undefined,
      AND: categoryIds.map((categoryId) => ({
        categories: {
          some: {
            id: categoryId,
          },
        },
      })),
    },
    include: {
      author: true,
      categories: true,
    },
    orderBy: {
      createdAt: sort || "desc", // Sort by createdAt (default: descending)
    },
  });

  // Function to generate pagination links with ellipsis
  const getPaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5; // Number of visible page links (excluding ellipsis)

    // Always show the first page
    links.push(1);

    // Show ellipsis if current page is far from the start
    if (currentPage > maxVisiblePages - 2) {
      links.push("...");
    }

    // Calculate the range of visible pages around the current page
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      links.push(i);
    }

    // Show ellipsis if current page is far from the end
    if (currentPage < totalPages - (maxVisiblePages - 2)) {
      links.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      links.push(totalPages);
    }

    return links;
  };

  // Helper function to build URL with filters and page
  const buildPaginationUrl = (page: number) => {
    const newSearchParams = new URLSearchParams();
    if (author) newSearchParams.set("author", author);
    if (title) newSearchParams.set("title", title);
    if (categories) newSearchParams.set("categories", categories);
    if (sort) newSearchParams.set("sort", sort);
    newSearchParams.set("page", page.toString());
    return `/?${newSearchParams.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>

      {/* Filters */}
      <Filters allCategories={allCategories} />

      {/* Blog List */}
      <div className="flex flex-col space-y-4">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`}>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 mt-2">
                {blog.content.slice(0, 100)}...
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {blog.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500">
                  By {blog.author.name}
                </span>
              </div>
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

      {/* Pagination */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            {/* Previous Page Button */}
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1 ? buildPaginationUrl(currentPage - 1) : ""
                }
                aria-disabled={currentPage <= 1}
              />
            </PaginationItem>

            {/* Page Numbers with Ellipsis */}
            {getPaginationLinks().map((link, index) =>
              link === "..." ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={buildPaginationUrl(link as number)}
                    isActive={link === currentPage}
                  >
                    {link}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next Page Button */}
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? buildPaginationUrl(currentPage + 1)
                    : ""
                }
                aria-disabled={currentPage >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
