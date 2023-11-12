import { formatPhoneNumber } from './formatPhoneNumber'

describe('function: formatPhoneNumber', () => {
  it('should format a valid phone number string to the (99) 9 9999-9999 format', () => {
    const formattedNumber = formatPhoneNumber('99999999999')
    expect(formattedNumber).toBe('(99) 9 9999-9999')
  })

  it('should return false if the input string is not a valid phone number', () => {
    const formattedNumber = formatPhoneNumber('xxxxxxxxxxx')
    expect(formattedNumber).toBeFalsy()
  })

  it('should return empty if phone number is empty', () => {
    const formattedNumber = formatPhoneNumber('')
    expect(formattedNumber).toBe('')
  })
})
