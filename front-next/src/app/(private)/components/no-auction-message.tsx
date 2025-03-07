export const NoAuctionMessage = () => {
  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark shadow-l relative mx-auto flex w-full flex-col items-center rounded-lg p-6 text-center">
      <strong className="text-textPrimary-light dark:text-textPrimary-dark text-xl font-semibold">
        Nenhum leilão disponível no momento. ⏳
      </strong>
      <span className="text-primary-light dark:text-primary-dark mt-2 text-base font-medium">
        Mas fique atento! Em breve, novos itens incríveis estarão em disputa.
        🚀✨
      </span>
      <span className="text-textSecondary-light dark:text-textSecondary-dark mt-2 text-sm">
        Prepare-se para dar seu lance e conquistar o que deseja! 🏆💰
      </span>
    </div>
  )
}
