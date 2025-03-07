'use client'

export const AuctionCardSkeleton = () => {
  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark flex w-full animate-pulse flex-col gap-3 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="dark:bg-secondary-dark h-5 w-32 rounded bg-gray-300"></div>
        <div className="dark:bg-secondary-dark h-6 w-6 rounded bg-gray-300"></div>
      </div>

      <div className="dark:bg-secondary-dark h-4 w-40 rounded bg-gray-300"></div>

      <div className="flex items-center gap-2">
        <div className="dark:bg-secondary-dark h-5 w-5 rounded-full bg-gray-300"></div>
        <div className="dark:bg-secondary-dark h-4 w-20 rounded bg-gray-300"></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="dark:bg-secondary-dark h-5 w-5 rounded-full bg-gray-300"></div>
        <div className="dark:bg-secondary-dark h-4 w-28 rounded bg-gray-300"></div>
      </div>

      <div className="dark:bg-secondary-dark h-2 w-full overflow-hidden rounded-full bg-gray-300">
        <div className="h-full w-[20%] rounded-full bg-gray-400 dark:bg-gray-600"></div>
      </div>

      <div className="mt-auto flex justify-start gap-3">
        <div className="dark:bg-secondary-dark h-8 w-24 rounded bg-gray-300"></div>
        <div className="dark:bg-secondary-dark h-8 w-24 rounded bg-gray-300"></div>
      </div>
    </div>
  )
}
