// app/users/[id]/Loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Profile Header Loading Placeholder */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      </div>

      {/* User Information Loading Placeholder */}
      <div className="mb-8 animate-pulse">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* User's Blogs Loading Placeholder */}
      <div className="mb-8 animate-pulse">
        <h2 className="text-xl font-semibold mb-4">Blogs</h2>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* User's Comments Loading Placeholder */}
      <div className="animate-pulse">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
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
