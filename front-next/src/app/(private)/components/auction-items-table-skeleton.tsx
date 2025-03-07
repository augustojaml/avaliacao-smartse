export const AuctionItemTableSkeleton = () => {
  return (
    <table className="w-full border-collapse gap-3 rounded-lg p-4 text-left text-sm shadow-lg">
      <thead className="text-textPrimary-dark bg-primary-light dark:bg-primary-dark bg-opacity-100">
        <tr>
          <th className="px-4 py-2">Nome do Item</th>
          <th className="px-4 py-2 text-center">Quantidade</th>
          <th className="px-4 py-2 text-end">Valor Inicial</th>
          <th className="px-4 py-2 text-end">Início do Leilão</th>
          <th className="px-4 py-2 text-end">Fim do Leilão</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr
            key={index}
            className={`dark:border-primary-light/30 border-primary-light/30 border-b ${
              index % 2 === 0 ? 'dark:bg-secondary-dark bg-gray-50' : ''
            }`}
          >
            <td className="px-4 py-3">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-center">
                <div className="h-4 w-10 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
