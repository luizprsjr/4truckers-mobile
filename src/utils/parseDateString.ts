export function parseDateString(dateString: string | undefined) {
  if (!dateString) {
    return null
  }

  const [day, month, year] = dateString.split('/').map(Number)
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null
  }

  return new Date(year, month - 1, day)
}
