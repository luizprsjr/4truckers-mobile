import { mockedUser } from '@__tests__/mocks/user/mocked-user'
import { renderWithAuth, screen, waitFor } from '@__tests__/utils/custom-render'
import { storageSaveAuthToken } from '@storage/storage-auth-token'
import { storageSaveRefreshToken } from '@storage/storage-refresh-token'
import { storageSaveUser } from '@storage/stored-user'

import { Routes } from './'

describe('routes', () => {
  beforeEach(() => jest.useFakeTimers())

  it('should render sign-in screen when the user does not have an id and phone', async () => {
    renderWithAuth(<Routes />)

    const buttonText = await waitFor(() =>
      screen.findByText(/Entrar com Google/i),
    )

    expect(buttonText).toBeOnTheScreen()
  })

  it('should render home screen when have a user in storage', async () => {
    await storageSaveUser(mockedUser)
    await storageSaveAuthToken('any-token')
    await storageSaveRefreshToken('any-token')

    renderWithAuth(<Routes />)

    // act(() => {
    //   jest.advanceTimersByTime(1000)
    // })

    await waitFor(() => {
      expect(
        screen.getByText(/não há anúncios ativos no momento/i),
      ).toBeOnTheScreen()
    })
  })

  it('should render add user info screen when the user does not have a phone number', async () => {
    const user = mockedUser
    user.phoneNumber = ''
    await storageSaveUser(user)
    await storageSaveAuthToken('any-token')
    await storageSaveRefreshToken('any-token')

    renderWithAuth(<Routes />)

    await waitFor(() => {
      expect(screen.getByText(/Selecione o tipo de usuário/i)).toBeOnTheScreen()
    })
  })
})
