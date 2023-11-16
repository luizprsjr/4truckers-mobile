export function isNumber(value: string | number) {
  const num = Number(value)
  if (isNaN(num)) return false
  return true
}
