export function formatYear(date: string | null | undefined) {
  if (!date) {
    return '-'
  }

  return date.slice(0, 4) || '-'
}
