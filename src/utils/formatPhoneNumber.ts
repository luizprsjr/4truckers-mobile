export function formatPhoneNumber(inputText: string) {
  const cleanedText = inputText.replace(/\D/g, '')
  const limitedText = cleanedText.slice(0, 11)
  let formattedText = ''

  if (limitedText.length < 11) {
    formattedText = limitedText.replace(/(\d{2})(\d{1,4})/, '($1) $2')
  } else {
    formattedText = limitedText.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      '($1) $2 $3-$4',
    )
  }

  return formattedText
}
