import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { api } from '@api/index'

import { AddTruck } from './add-truck'

const axios = jest.spyOn(api, 'post')

describe('screen: AddAnnouncement(AddTruck)', () => {
  it('should not call the api if the required fields are not valid', async () => {
    render(<AddTruck />)
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => fireEvent.press(submitButton))

    expect(axios).not.toHaveBeenCalled()
  })

  it('should not return an error message if truck model is provided', async () => {
    render(<AddTruck />)
    const truckModel = screen.getByTestId('truck-model')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(truckModel, 'any-truck')
    await waitFor(() => fireEvent.press(submitButton))
    expect(screen.queryByText(/Informe o modelo/i)).not.toBeOnTheScreen()
  })

  it('should not return an error message if capacity is provided', async () => {
    render(<AddTruck />)
    const capacity = screen.getByTestId('capacity')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(capacity, '42')
    await waitFor(() => fireEvent.press(submitButton))
    expect(screen.queryByText(/Informe a capacidade/i)).not.toBeOnTheScreen()
  })

  it('should call api with correct values when required values are valid', async () => {
    jest.useFakeTimers()
    render(<AddTruck />)
    const truckModel = screen.getByTestId('truck-model')
    const capacity = screen.getByTestId('capacity')
    const submitButton = screen.getByTestId('submit-button')

    fireEvent.changeText(truckModel, 'any-truck')
    fireEvent.changeText(capacity, '42')
    await waitFor(() => fireEvent.press(submitButton))

    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith('/trucks', {
        truckModel: 'any-truck',
        capacity: 42,
        height: undefined,
        length: undefined,
        width: undefined,
      })
    })
  })
})
