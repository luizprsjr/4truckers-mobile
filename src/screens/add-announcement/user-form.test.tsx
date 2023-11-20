import { createDateTimeSetEvtParams } from '@__tests__/mocks/libs/date-time-picker-event'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { api } from '@api/index'

import { UserForm } from './user-form'

const fakeDate = new Date('2025-12-12T12:00:00.000-03:00')

const axios = jest.spyOn(api, 'post')

describe('screen: AddAnnouncement(UserForm)', () => {
  it('should not call the api if the required fields are not valid', async () => {
    render(<UserForm />)
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => fireEvent.press(submitButton))

    expect(axios).not.toHaveBeenCalled()
  })

  it('should not return an error message if origin city is send', async () => {
    render(<UserForm />)
    const originCity = screen.getByTestId('origin-city')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(originCity, 'any-city')
    await waitFor(() => fireEvent.press(submitButton))
    expect(
      screen.queryByText(/Informe a cidade de coleta/i),
    ).not.toBeOnTheScreen()
  })

  it('should not return an error message if pickup date is selected', async () => {
    render(<UserForm />)
    const showPickerButton = screen.getByTestId('pick-up-date-button')
    fireEvent.press(showPickerButton)

    waitFor(() =>
      fireEvent(
        screen.getByTestId('pick-up-date'),
        'onChange',
        ...createDateTimeSetEvtParams(fakeDate),
      ),
    )

    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => fireEvent.press(submitButton))

    expect(
      screen.queryByText(/Informe a data de partida/i),
    ).not.toBeOnTheScreen()
  })

  it('should not return an error message if destination city is send', async () => {
    render(<UserForm />)
    const destination = screen.getByTestId('destination-city')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(destination, 'any-city')
    await waitFor(() => fireEvent.press(submitButton))
    expect(
      screen.queryByText(/Informe a cidade de entrega/i),
    ).not.toBeOnTheScreen()
  })

  it('should not return an error message if origin city is send', async () => {
    render(<UserForm />)
    const weight = screen.getByTestId('weight')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(weight, '99')
    await waitFor(() => fireEvent.press(submitButton))
    expect(screen.queryByText(/Informe o peso/i)).not.toBeOnTheScreen()
  })

  it('should call api with correct values when required values are valid', async () => {
    jest.useFakeTimers()
    render(<UserForm />)
    const originCity = screen.getByTestId('origin-city')
    const showDatePickerButton = screen.getByTestId('pick-up-date-button')
    const destination = screen.getByTestId('destination-city')
    const weight = screen.getByTestId('weight')
    const submitButton = screen.getByTestId('submit-button')

    waitFor(() => {
      fireEvent.changeText(originCity, 'any-city')
      fireEvent.press(showDatePickerButton)
      fireEvent(
        screen.getByTestId('pick-up-date'),
        'onChange',
        ...createDateTimeSetEvtParams(fakeDate),
      )
      fireEvent.changeText(destination, 'any-city2')
      fireEvent.changeText(weight, '99')
      fireEvent.press(submitButton)
    })

    const formattedDate = fakeDate
    formattedDate?.setHours(23)
    formattedDate?.setMinutes(59)

    const responseData = {
      originCity: 'any-city',
      pickupOrDepartureDate: formattedDate,
      pickUpMaxDate: undefined,
      destinationCity: 'any-city2',
      deliveryMaxDate: undefined,
      weight: 99,
      length: undefined,
      width: undefined,
      height: undefined,
      canStack: false,
      description: undefined,
    }

    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith('/announcements', responseData)
    })
  })
})
