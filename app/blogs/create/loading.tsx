// app/blogs/create/Loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Page Title Loading Placeholder */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      </div>

      {/* Form Loading Placeholder */}
      <div className="space-y-6 animate-pulse">
        {/* Title Input Loading Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Content Textarea Loading Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Categories Loading Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button Loading Placeholder */}
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}
