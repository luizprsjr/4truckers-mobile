import dayjs from 'dayjs'

export function isTimeAheadByOneHour(
  pickupOrDepartureDate: Date,
  originTime: Date,
  arrivalOrDeliveryDate: Date | undefined,
  destinationTime: Date | undefined,
): boolean {
  if (
    pickupOrDepartureDate &&
    originTime &&
    arrivalOrDeliveryDate &&
    destinationTime
  ) {
    const pickupOrDepartureDateTime = dayjs(pickupOrDepartureDate)
      .set('hour', originTime.getHours())
      .set('minutes', originTime.getMinutes())
    const arrivalOrDeliveryDateTime = dayjs(arrivalOrDeliveryDate)
      .set('hour', destinationTime.getHours() - 1)
      .set('minutes', destinationTime.getMinutes())

    return arrivalOrDeliveryDateTime.isAfter(pickupOrDepartureDateTime)
  }
  return true
}
