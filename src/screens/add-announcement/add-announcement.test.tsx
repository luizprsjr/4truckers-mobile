import { mockedTruckerWithTruck } from '@__tests__/__mocks__/user/mocked-trucker-with-truck'
import { mockedTruckerWithoutTruck } from '@__tests__/__mocks__/user/mocked-trucker-without-truck'
import { mockedUser } from '@__tests__/__mocks__/user/mocked-user'
import { renderWithAuth, screen, waitFor } from '@__tests__/utils/custom-render'
import { storageSaveAuthToken } from '@storage/storage-auth-token'
import { storageSaveRefreshToken } from '@storage/storage-refresh-token'
import { storageSaveUser } from '@storage/stored-user'

import { AddAnnouncement } from './add-announcement'

describe('screen: AddAnnouncement', () => {
  it('should render user form if user type is user', async () => {
    await storageSaveUser(mockedUser)
    await storageSaveAuthToken('any-token')
    await storageSaveRefreshToken('any-token')

    renderWithAuth(<AddAnnouncement />)

    await waitFor(() => {
      expect(screen.getByText(/Registrar carga/i)).toBeOnTheScreen()
    })
  })

  it('should render trucker form if user type is trucker and user have a truck', async () => {
    await storageSaveUser(mockedTruckerWithTruck)
    await storageSaveAuthToken('any-token')
    await storageSaveRefreshToken('any-token')

    renderWithAuth(<AddAnnouncement />)

    await waitFor(() => {
      expect(screen.getByText(/Registrar viagem/i)).toBeOnTheScreen()
    })
  })

  it('should render no truck if user type is trucker and user does not have a truck', async () => {
    await storageSaveUser(mockedTruckerWithoutTruck)
    await storageSaveAuthToken('any-token')
    await storageSaveRefreshToken('any-token')

    renderWithAuth(<AddAnnouncement />)

    await waitFor(() => {
      expect(screen.getByText(/registrar caminhão/i)).toBeOnTheScreen()
    })
  })
})
