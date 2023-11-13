import {
  mockUseAuthReturn,
  mockUseAuthSignOut,
} from '@__tests__/mocks/hooks/use-auth'
import { mockedTruckerWithTruck } from '@__tests__/mocks/user/mocked-trucker-with-truck'
import { mockedTruckerWithoutTruck } from '@__tests__/mocks/user/mocked-trucker-without-truck'
import { mockedUser } from '@__tests__/mocks/user/mocked-user'
import {
  fireEvent,
  renderWithAuth,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import avatar from '@assets/avatar.png'
import * as useAuthModule from '@hooks/useAuth'

import { Profile } from './profile'

describe('screen: Profile', () => {
  beforeEach(() => jest.useFakeTimers())

  it('should render user truck model name if user has one', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedTruckerWithTruck))
    renderWithAuth(<Profile />)

    await waitFor(() => {
      const truckName = screen.getByTestId('truck-name')
      expect(truckName).toBeOnTheScreen()
    })
  })

  it('should not render user truck model name if user has one', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedTruckerWithoutTruck))
    renderWithAuth(<Profile />)
    await waitFor(() => {
      const truckName = screen.queryByTestId('truck-name')
      expect(truckName).not.toBeOnTheScreen()
    })
  })

  it('should render the user avatar image if user has one', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedUser))
    renderWithAuth(<Profile />)
    await waitFor(() => {
      const avatarImage = screen.getByTestId('avatar-image')
      expect(avatarImage.props.source).toEqual({ uri: mockedUser.avatarUrl })
    })
  })

  it('should render the default avatar image if user does not have an avatarUrl', async () => {
    const user = mockedUser
    user.avatarUrl = undefined
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(user))
    renderWithAuth(<Profile />)
    await waitFor(() => {
      const avatarImage = screen.getByTestId('avatar-image')
      expect(avatarImage.props.source).toBe(avatar)
    })
  })

  it('should call handleWithSignOut on button press', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedUser))

    renderWithAuth(<Profile />)

    await waitFor(() => {
      fireEvent.press(screen.getByTestId('logout-button'))
      expect(mockUseAuthSignOut).toHaveBeenCalled()
    })
  })
})
