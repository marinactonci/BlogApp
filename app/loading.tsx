// components/Loading.tsx

export default async function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>

      {/* Filters Loading Placeholder */}
      <div className="mb-8 space-y-4 animate-pulse">
        {/* Search by Author */}
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>

        {/* Search by Title */}
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>

        {/* Filter by Categories */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Sort Order */}
        <div className="h-10 bg-gray-200 rounded-lg w-[180px]"></div>

        {/* Reset Filters Button */}
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>

      {/* Blog List Loading Placeholder */}
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-200 rounded-full w-16"
                ></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-36 mt-2"></div>
          </div>
        ))}
      </div>

      {/* Pagination Loading Placeholder */}
      <div className="mt-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
}
