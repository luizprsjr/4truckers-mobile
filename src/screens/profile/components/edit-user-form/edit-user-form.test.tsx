import {
  act,
  fireEvent,
  renderWithAuth,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { api } from '@api/index'

import { EditUserForm } from './edit-user-form'

const axios = jest.spyOn(api, 'put')

describe('screen: Profile(EditUserForm)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should format correctly the phone input', async () => {
    jest.useFakeTimers()
    renderWithAuth(<EditUserForm />)
    const phone = screen.getByTestId('phone-number')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(phone, '99999999999')
    await waitFor(() => fireEvent.press(submitButton))
    expect(phone.props.value).toBe('(99) 9 9999-9999')
  })

  it('should not call cal the API if phone is in wrong format', async () => {
    jest.useFakeTimers()
    renderWithAuth(<EditUserForm />)
    const phone = screen.getByTestId('phone-number')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(phone, '99')
    await waitFor(() => fireEvent.press(submitButton))
    await waitFor(() => {
      expect(axios).not.toHaveBeenCalled()
    })
  })

  it('should call API if phone is correctly', async () => {
    jest.useFakeTimers()
    renderWithAuth(<EditUserForm />)
    const phone = screen.getByTestId('phone-number')
    const submitButton = screen.getByTestId('submit-button')

    await act(async () => {
      fireEvent.changeText(phone, '99999999999')
      await waitFor(() => fireEvent.press(submitButton))
    })

    await waitFor(() => {
      expect(axios).toHaveBeenCalled()
    })
  })
})
