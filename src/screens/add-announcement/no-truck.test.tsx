import { mockUseAuthReturn } from '@__tests__/mocks/hooks/use-auth'
import { mockedNavigate } from '@__tests__/mocks/libs/react-navigation-native'
import { mockedTruckerWithoutTruck } from '@__tests__/mocks/user/mocked-trucker-without-truck'
import {
  fireEvent,
  renderWithAuth,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import * as useAuthModule from '@hooks/useAuth'

import { NoTruck } from './no-truck'

describe('screen: AddAnnouncement(NoTruck)', () => {
  it('should call navigation to navigate to add truck screen when button is pressed', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedTruckerWithoutTruck))

    renderWithAuth(<NoTruck />)
    const button = screen.getByText(/registrar caminhão/i)
    fireEvent.press(button)

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('addTruck')
    })
  })
})
