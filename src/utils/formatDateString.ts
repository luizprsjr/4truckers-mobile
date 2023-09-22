export function formatDateString(text: string) {
  const numericText = text.replace(/\D/g, '')
  if (numericText.length <= 2) {
    return numericText
  } else if (numericText.length <= 4) {
    return numericText.slice(0, 2) + '/' + numericText.slice(2)
  } else {
    return (
      numericText.slice(0, 2) +
      '/' +
      numericText.slice(2, 4) +
      '/' +
      numericText.slice(4, 8)
    )
  }
}
