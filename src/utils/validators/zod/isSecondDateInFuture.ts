import dayjs from 'dayjs'

export function isSecondDateInFuture(
  firstDate: Date,
  secondDate: Date | undefined,
): boolean {
  if (firstDate && secondDate) {
    const origin = dayjs(firstDate)
    const destination = dayjs(secondDate)

    return destination.isAfter(origin) || destination.isSame(origin, 'day')
  }
  return true
}
