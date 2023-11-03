import { isFutureDate } from './isFutureDate'

describe('isFutureDate Function', () => {
  it('should return false if date is defined and time is not', () => {
    const inputData = {
      date: new Date(),
      time: undefined,
    }

    expect(isFutureDate(inputData, 'date', 'time')).toBe(false)
  })

  it('should return true if date is undefined', () => {
    const inputData = {
      date: undefined,
      time: new Date(),
    }

    expect(isFutureDate(inputData, 'date', 'time')).toBe(true)
  })

  it('should return true if both date and time are undefined', () => {
    const inputData = {
      date: undefined,
      time: undefined,
    }

    expect(isFutureDate(inputData, 'date', 'time')).toBe(true)
  })

  it('should return true if combinedDate is in the future', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)
    const futureTime = new Date(futureDate)
    futureTime.setHours(futureTime.getHours() + 1)

    const inputData = {
      date: futureDate,
      time: futureTime,
    }

    expect(isFutureDate(inputData, 'date', 'time')).toBe(true)
  })

  it('should return false if combinedDate is in the past', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)
    const pastTime = new Date(pastDate)
    pastTime.setHours(pastTime.getHours() - 1)

    const inputData = {
      date: pastDate,
      time: pastTime,
    }

    expect(isFutureDate(inputData, 'date', 'time')).toBe(false)
  })
})
