export const ApiErrorMessage = () => {
  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark shadow-l relative mx-auto flex w-full flex-col items-center rounded-lg p-6 text-center">
      <strong className="text-textPrimary-light dark:text-textPrimary-dark text-xl font-semibold">
        Erro ao carregar os leilões. ❌
      </strong>
      <span className="text-primary-light dark:text-primary-dark mt-2 text-base font-medium">
        Houve um problema ao buscar os dados. Tente novamente mais tarde.
      </span>
      <span className="text-textSecondary-light dark:text-textSecondary-dark mt-2 text-sm">
        Se o problema persistir, entre em contato com o suporte. 🛠️📞
      </span>
    </div>
  )
}
