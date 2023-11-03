import dayjs from 'dayjs'

import { isDestinationDateInFuture } from './isDestinationDateInFuture'

describe('function: isDestinationDateInFuture', () => {
  it('should return true for destination date in the future', () => {
    const originDate = dayjs('2023-11-03')
    const destinationDate = dayjs('2023-11-04')

    const result = isDestinationDateInFuture(
      originDate.toDate(),
      destinationDate.toDate(),
    )

    expect(result).toBe(true)
  })

  it('should return false for destination date in the past', () => {
    const originDate = dayjs('2023-11-03')
    const destinationDate = dayjs('2023-11-02')

    const result = isDestinationDateInFuture(
      originDate.toDate(),
      destinationDate.toDate(),
    )

    expect(result).toBe(false)
  })

  it('should return true when destination date is the same as origin date', () => {
    const originDate = dayjs('2023-11-03')
    const destinationDate = dayjs('2023-11-03')

    const result = isDestinationDateInFuture(
      originDate.toDate(),
      destinationDate.toDate(),
    )

    expect(result).toBe(true)
  })

  it('should return true when destination date is not provided', () => {
    const originDate = dayjs('2023-11-03')
    const destinationDate = undefined

    const result = isDestinationDateInFuture(
      originDate.toDate(),
      destinationDate,
    )

    expect(result).toBe(true)
  })
})
