import dayjs from 'dayjs'

export function isDestinationDateInFuture(
  originDate: Date,
  destinationDate: Date | undefined,
): boolean {
  if (originDate && destinationDate) {
    const origin = dayjs(originDate)
    const destination = dayjs(destinationDate)

    return destination.isAfter(origin) || destination.isSame(origin, 'day')
  }
  return true
}
