import dayjs from 'dayjs'

export function isTimeAheadByOneHour(
  originDate: Date,
  originTime: Date,
  destinationDate: Date | undefined,
  destinationTime: Date | undefined,
): boolean {
  if (originDate && originTime && destinationDate && destinationTime) {
    const originDateTime = dayjs(originDate)
      .set('hour', originTime.getHours())
      .set('minutes', originTime.getMinutes())
    const destinationDateTime = dayjs(destinationDate)
      .set('hour', destinationTime.getHours() - 1)
      .set('minutes', destinationTime.getMinutes())

    return destinationDateTime.isAfter(originDateTime)
  }
  return true
}
