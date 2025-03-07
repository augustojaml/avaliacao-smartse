export const formatDatePtBRIntl = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  } catch (error) {
    console.error('Invalid date format:', error)
    return ''
  }
}
