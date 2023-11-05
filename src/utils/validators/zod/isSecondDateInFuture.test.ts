import dayjs from 'dayjs'

import { isSecondDateInFuture } from './isSecondDateInFuture'

describe('function: isSecondDateInFuture', () => {
  it('should return true for destination date in the future', () => {
    const pickupOrDepartureDate = dayjs('2023-11-03')
    const arrivalOrDeliveryDate = dayjs('2023-11-04')

    const result = isSecondDateInFuture(
      pickupOrDepartureDate.toDate(),
      arrivalOrDeliveryDate.toDate(),
    )

    expect(result).toBe(true)
  })

  it('should return false for destination date in the past', () => {
    const pickupOrDepartureDate = dayjs('2023-11-03')
    const arrivalOrDeliveryDate = dayjs('2023-11-02')

    const result = isSecondDateInFuture(
      pickupOrDepartureDate.toDate(),
      arrivalOrDeliveryDate.toDate(),
    )

    expect(result).toBe(false)
  })

  it('should return true when destination date is the same as origin date', () => {
    const pickupOrDepartureDate = dayjs('2023-11-03')
    const arrivalOrDeliveryDate = dayjs('2023-11-03')

    const result = isSecondDateInFuture(
      pickupOrDepartureDate.toDate(),
      arrivalOrDeliveryDate.toDate(),
    )

    expect(result).toBe(true)
  })

  it('should return true when destination date is not provided', () => {
    const pickupOrDepartureDate = dayjs('2023-11-03')
    const arrivalOrDeliveryDate = undefined

    const result = isSecondDateInFuture(
      pickupOrDepartureDate.toDate(),
      arrivalOrDeliveryDate,
    )

    expect(result).toBe(true)
  })
})
