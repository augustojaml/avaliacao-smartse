export const Greetings = () => {
  return (
    <div className="flex flex-col items-end gap-4 space-y-4 text-right">
      <div>
        <h2 className="text-textPrimary-dark text-4xl font-bold">
          Bem-vindo à
        </h2>
        <h2 className="text-textPrimary-dark text-4xl font-bold">
          Plataforma de Licitações!
        </h2>
      </div>
      <p className="text-textPrimary-dark mb-8 max-w-md leading-relaxed">
        Conquiste contratos públicos e oportunidades exclusivas! Participe de
        leilões e licitações, faça seus lances e garanta o melhor preço para
        seus serviços e produtos.
      </p>
    </div>
  )
}
