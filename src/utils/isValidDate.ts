export function isValidDate(value: string | undefined) {
  if (!value) {
    return true
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return false
  }

  const [day, month, year] = value.split('/').map(Number)

  return day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 2023
}
