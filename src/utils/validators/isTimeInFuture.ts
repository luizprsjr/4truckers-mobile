/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function isTimeInFuture(data: any, dateKey: string, timeKey: string) {
  if (data[dateKey] && !data[timeKey]) return false
  if (!data[dateKey] || !data[timeKey]) return true

  const date = new Date(data[dateKey]!)
  const time = new Date(data[timeKey]!)

  const combinedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
  )

  return combinedDate > new Date()
}
