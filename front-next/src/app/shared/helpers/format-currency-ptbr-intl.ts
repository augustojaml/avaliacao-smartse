export const formatCurrencyPtBRIntl = (
  value: number,
  currency: string = 'BRL',
  locale: string = 'pt-BR',
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  } catch (error) {
    console.error('Invalid currency format:', error)
    return ''
  }
}
