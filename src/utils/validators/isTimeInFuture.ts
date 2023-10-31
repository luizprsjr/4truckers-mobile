interface Props {
  destinationDate?: Date
  destinationTime?: Date
}

export function isTimeInFuture(data: Props) {
  if (data.destinationDate && !data.destinationTime) return false
  if (!data.destinationDate || !data.destinationTime) return true

  const destinationDay = new Date(data.destinationDate)
  const destinationHour = new Date(data.destinationTime)

  const combinedDate = new Date(
    destinationDay.getFullYear(),
    destinationDay.getMonth(),
    destinationDay.getDate(),
    destinationHour.getHours(),
    destinationHour.getMinutes(),
  )

  return combinedDate > new Date()
}
