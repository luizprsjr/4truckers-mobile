export function isDateInFuture(date: Date | undefined): boolean {
  if (date === undefined) return true

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}
