import { isTimeInFuture } from './isTimeInFuture'

describe('isTimeInFuture Function', () => {
  it('should return false if destinationDate is defined and destinationTime is not', () => {
    const inputData = {
      destinationDate: new Date(),
      destinationTime: undefined,
    }

    expect(isTimeInFuture(inputData)).toBe(false)
  })

  it('should return true if destinationDate is undefined', () => {
    const inputData = {
      destinationDate: undefined,
      destinationTime: new Date(),
    }

    expect(isTimeInFuture(inputData)).toBe(true)
  })

  it('should return true if both destinationDate and destinationTime are undefined', () => {
    const inputData = {
      destinationDate: undefined,
      destinationTime: undefined,
    }

    expect(isTimeInFuture(inputData)).toBe(true)
  })

  it('should return true if combinedDate is in the future', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)
    const futureTime = new Date(futureDate)
    futureTime.setHours(futureTime.getHours() + 1)

    const inputData = {
      destinationDate: futureDate,
      destinationTime: futureTime,
    }

    expect(isTimeInFuture(inputData)).toBe(true)
  })

  it('should return false if combinedDate is in the past', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)
    const pastTime = new Date(pastDate)
    pastTime.setHours(pastTime.getHours() - 1)

    const inputData = {
      destinationDate: pastDate,
      destinationTime: pastTime,
    }

    expect(isTimeInFuture(inputData)).toBe(false)
  })
})
