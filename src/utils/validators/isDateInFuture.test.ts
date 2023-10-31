import { isDateInFuture } from './isDateInFuture'

describe('function: isFutureDate', () => {
  it('should return true for a future date', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)

    expect(isDateInFuture(futureDate)).toBe(true)
  })

  it('should return false for a past date', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)

    expect(isDateInFuture(pastDate)).toBe(false)
  })

  it('should return true for undefined date', () => {
    expect(isDateInFuture(undefined)).toBe(true)
  })
})
