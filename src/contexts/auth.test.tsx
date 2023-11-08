import { mockedUser } from '@__tests__/__mocks__/user/mocked-user'
import {
  act,
  renderHookWithAuth,
  waitFor,
} from '@__tests__/utils/custom-render'
import { api } from '@api/index'
import { useAuth } from '@hooks/useAuth'

const mockedResponse = {
  user: mockedUser,
  token: 'any_token',
  refreshToken: 'any_refresh_token',
}

describe('context: AuthContext', () => {
  it('should return an empty user objet by default', async () => {
    const { result } = renderHookWithAuth(() => useAuth())

    await waitFor(() => act(() => expect(result.current.user).toEqual({})))
  })

  it('should update user when updateUser is called', async () => {
    const { result } = renderHookWithAuth(() => useAuth())

    await waitFor(() => act(() => result.current.updateUser(mockedUser)))

    expect(result.current.user.name).toBe(mockedUser.name)
  })

  it('should update user when signIn is called', async () => {
    const { result } = renderHookWithAuth(() => useAuth())

    jest.spyOn(api, 'post').mockResolvedValue({ data: mockedResponse })

    const email = mockedUser.email
    const password = 'any_password'

    await waitFor(() => act(() => result.current.signIn(email, password)))

    expect(result.current.user.name).toBe(mockedUser.name)
  })

  it('should update user when googleSignIn is called', async () => {
    const { result } = renderHookWithAuth(() => useAuth())

    jest.spyOn(api, 'post').mockResolvedValue({ data: mockedResponse })

    await waitFor(() =>
      act(() => result.current.googleSignIn('any_access_token')),
    )

    expect(result.current.user.name).toBe(mockedUser.name)
  })

  it('should remove user when signOut is called', async () => {
    const { result } = renderHookWithAuth(() => useAuth())

    await waitFor(() => act(() => result.current.updateUser(mockedUser)))

    expect(result.current.user.name).toBe(mockedUser.name)

    await waitFor(() => act(() => result.current.signOut()))

    expect(result.current.user.name).toBeUndefined()
  })
})
