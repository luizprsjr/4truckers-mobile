import { mockUseAuthReturn } from '@__tests__/mocks/hooks/use-auth'
import { mockedTruckerWithTruck } from '@__tests__/mocks/user/mocked-trucker-with-truck'
import { mockedTruckerWithoutTruck } from '@__tests__/mocks/user/mocked-trucker-without-truck'
import { mockedUser } from '@__tests__/mocks/user/mocked-user'
import { renderWithAuth, screen, waitFor } from '@__tests__/utils/custom-render'
import * as useAuthModule from '@hooks/useAuth'

import { AddAnnouncement } from './add-announcement'

describe('screen: AddAnnouncement', () => {
  it('should render user form if user type is user', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedUser))

    renderWithAuth(<AddAnnouncement />)

    await waitFor(() => {
      expect(screen.getByText(/Registrar carga/i)).toBeOnTheScreen()
    })
  })

  it('should render trucker form if user type is trucker and user have a truck', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedTruckerWithTruck))

    renderWithAuth(<AddAnnouncement />)

    await waitFor(() => {
      expect(screen.getByText(/Registrar viagem/i)).toBeOnTheScreen()
    })
  })

  it('should render no truck if user type is trucker and user does not have a truck', async () => {
    jest
      .spyOn(useAuthModule, 'useAuth')
      .mockReturnValue(mockUseAuthReturn(mockedTruckerWithoutTruck))

    renderWithAuth(<AddAnnouncement />)

    await waitFor(() => {
      expect(screen.getByText(/registrar caminhão/i)).toBeOnTheScreen()
    })
  })
})
