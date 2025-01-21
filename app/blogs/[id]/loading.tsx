// app/blogs/[id]/Loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Blog Title Loading Placeholder */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      </div>

      {/* Blog Content Loading Placeholder */}
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      </div>

      {/* Author and Date Loading Placeholder */}
      <div className="mt-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Categories Loading Placeholder */}
      <div className="mt-4 animate-pulse">
        <div className="flex space-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-200 rounded-full w-16"
            ></div>
          ))}
        </div>
      </div>

      {/* Comments Section Loading Placeholder */}
      <div className="mt-6 animate-pulse">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
