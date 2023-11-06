import {
  storageGetRefreshToken,
  storageRemoveRefreshToken,
  storageSaveRefreshToken,
} from './storage-refresh-token'

describe('storage: storageRefreshToken', () => {
  it('should return null when storage is empty', async () => {
    const storage = await storageGetRefreshToken()
    expect(storage).toBeNull()
  })

  it('should return the stored token', async () => {
    const token = 'any-token'
    await storageSaveRefreshToken(token)
    const storedToken = await storageGetRefreshToken()
    expect(storedToken).toBe(token)
  })

  it('should remove a stored token', async () => {
    const token = 'any-token'
    await storageSaveRefreshToken(token)
    const storedToken = await storageRemoveRefreshToken()
    expect(storedToken).toBeUndefined()
  })
})
