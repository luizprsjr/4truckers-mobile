import {
  storageGetAuthToken,
  storageRemoveAuthToken,
  storageSaveAuthToken,
} from './storage-auth-token'

describe('storage: storageAuthToken', () => {
  it('should return null when storage is empty', async () => {
    const storage = await storageGetAuthToken()
    expect(storage).toBeNull()
  })

  it('should return the stored token', async () => {
    const token = 'any-token'
    await storageSaveAuthToken(token)
    const storedToken = await storageGetAuthToken()
    expect(storedToken).toBe(token)
  })

  it('should remove a stored token', async () => {
    const token = 'any-token'
    await storageSaveAuthToken(token)
    const storedToken = await storageRemoveAuthToken()
    expect(storedToken).toBeUndefined()
  })
})
