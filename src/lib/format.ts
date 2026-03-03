const KO_DATE_FORMATTER = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const KO_CURRENCY_FORMATTER = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
})

export function formatDate(input: string | Date) {
  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return KO_DATE_FORMATTER.format(date)
}

export function formatCurrency(amount: number) {
  return KO_CURRENCY_FORMATTER.format(amount)
}
