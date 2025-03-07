export const AuctionSkeleton = () => {
  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark relative mx-auto w-full animate-pulse rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <div className="h-5 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="h-5 w-40 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="dark:bg-secondary-dark mt-2 max-h-60 overflow-y-auto rounded-lg bg-gray-50 p-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-300 py-2 last:border-none dark:border-gray-700"
            >
              <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-5 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
