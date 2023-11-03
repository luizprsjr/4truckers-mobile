import dayjs from 'dayjs'

import { isTimeAheadByOneHour } from './isTimeAheadByOneHour'

describe('isTimeAheadByOneHour', () => {
  it('should return true when destination time is at least 1 hour ahead', () => {
    const originDate = dayjs('2023-11-03')
    const originTime = dayjs('2023-11-03T10:00:00')
    const destinationDate = dayjs('2023-11-03')
    const destinationTime = dayjs('2023-11-03T11:30:00')

    const result = isTimeAheadByOneHour(
      originDate.toDate(),
      originTime.toDate(),
      destinationDate.toDate(),
      destinationTime.toDate(),
    )

    expect(result).toBe(true)
  })

  it('should return false when destination time is less than 1 hour ahead', () => {
    const originDate = dayjs('2023-11-03')
    const originTime = dayjs('2023-11-03T10:00:00')
    const destinationDate = dayjs('2023-11-03')
    const destinationTime = dayjs('2023-11-03T10:30:00')

    const result = isTimeAheadByOneHour(
      originDate.toDate(),
      originTime.toDate(),
      destinationDate.toDate(),
      destinationTime.toDate(),
    )

    expect(result).toBe(false)
  })

  it('should return true when destination time is not provided', () => {
    const originDate = dayjs('2023-11-03')
    const originTime = dayjs('2023-11-03T10:00:00')
    const destinationDate = undefined
    const destinationTime = undefined

    const result = isTimeAheadByOneHour(
      originDate.toDate(),
      originTime.toDate(),
      destinationDate,
      destinationTime,
    )

    expect(result).toBe(true)
  })
})
