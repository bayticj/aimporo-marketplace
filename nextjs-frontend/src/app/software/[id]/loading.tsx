export default function SoftwareLoading() {
  return (
    <div className="content bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-600">Loading software product...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 