import { mockedUser } from '@__tests__/mocks/user/mocked-user'

import {
  storageGetUser,
  storageRemoveUser,
  storageSaveUser,
} from './stored-user'

describe('storage: storageUser', () => {
  it('should return an empty object when does not have a user stored', async () => {
    const storage = await storageGetUser()
    expect(storage).toEqual({})
  })

  it('should return the stored token', async () => {
    await storageSaveUser(mockedUser)
    const storedUser = await storageGetUser()
    expect(storedUser).toEqual(mockedUser)
  })

  it('should remove a stored token', async () => {
    await storageSaveUser(mockedUser)
    const storedUser = await storageRemoveUser()
    expect(storedUser).toBeUndefined()
  })
})
