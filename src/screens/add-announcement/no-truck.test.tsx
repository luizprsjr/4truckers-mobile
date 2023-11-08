import { mockedNavigate } from '@__tests__/mocks/libs/react-navigation-native'
import { mockedTruckerWithoutTruck } from '@__tests__/mocks/user/mocked-trucker-without-truck'
import {
  fireEvent,
  renderWithAuth,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { storageSaveAuthToken } from '@storage/storage-auth-token'
import { storageSaveRefreshToken } from '@storage/storage-refresh-token'
import { storageSaveUser } from '@storage/stored-user'

import { NoTruck } from './no-truck'

describe('screen: AddAnnouncement(NoTruck)', () => {
  it('should call navigation to navigate to add truck screen when button is pressed', async () => {
    await storageSaveUser(mockedTruckerWithoutTruck)
    await storageSaveAuthToken('any-token')
    await storageSaveRefreshToken('any-token')

    renderWithAuth(<NoTruck />)
    const button = screen.getByText(/registrar caminhão/i)
    fireEvent.press(button)

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('addTruck')
    })
  })
})
