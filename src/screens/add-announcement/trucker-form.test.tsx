import { createDateTimeSetEvtParams } from '@__tests__/mocks/libs/date-time-picker-event'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { api } from '@api/index'

import { TruckerForm } from './trucker-form'

const fakeDate = new Date('2025-12-12T12:00:00.000-03:00')

const axios = jest.spyOn(api, 'post')

describe('screen: AddAnnouncement(TruckerForm)', () => {
  it('should show all the required erros when user does not send the infos', async () => {
    render(<TruckerForm />)
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => fireEvent.press(submitButton))

    expect(
      await screen.findByText(/Informe a cidade de partida/i),
    ).toBeOnTheScreen()
    expect(
      await screen.findByText(/Informe a data de partida/i),
    ).toBeOnTheScreen()
    expect(
      await screen.findByText(/Informe a hora de partida/i),
    ).toBeOnTheScreen()
    expect(
      await screen.findByText(/Informe a cidade de destino/i),
    ).toBeOnTheScreen()
  })

  it('should not call the api if the required fields are not valid', async () => {
    render(<TruckerForm />)
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => fireEvent.press(submitButton))

    await waitFor(() => {
      expect(axios).not.toHaveBeenCalled()
    })
  })

  it('should not return an error message if origin city is send', async () => {
    render(<TruckerForm />)
    const originCity = screen.getByTestId('origin-city')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(originCity, 'any-city')
    await waitFor(() => fireEvent.press(submitButton))
    expect(
      screen.queryByText(/Informe a cidade de partida/i),
    ).not.toBeOnTheScreen()
  })

  it('should not return an error message if origin date is selected', async () => {
    render(<TruckerForm />)
    const showPickerButton = screen.getByTestId('origin-date-button')
    fireEvent.press(showPickerButton)

    waitFor(() =>
      fireEvent(
        screen.getByTestId('origin-date'),
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

  it('should not return an error message if origin time is selected', async () => {
    render(<TruckerForm />)
    const showPickerButton = screen.getByTestId('origin-time-button')
    fireEvent.press(showPickerButton)

    waitFor(() =>
      fireEvent(
        screen.getByTestId('origin-time'),
        'onChange',
        ...createDateTimeSetEvtParams(fakeDate),
      ),
    )

    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => fireEvent.press(submitButton))

    expect(
      screen.queryByText(/Informe a hora de partida/i),
    ).not.toBeOnTheScreen()
  })

  it('should not return an error message if destination city is send', async () => {
    render(<TruckerForm />)
    const destination = screen.getByTestId('destination-city')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.changeText(destination, 'any-city')
    await waitFor(() => fireEvent.press(submitButton))
    expect(
      screen.queryByText(/Informe a cidade de destino/i),
    ).not.toBeOnTheScreen()
  })

  it('should call api with correct values when required values are valid', async () => {
    render(<TruckerForm />)
    const originCity = screen.getByTestId('origin-city')
    const showDatePickerButton = screen.getByTestId('origin-date-button')
    const showTimePickerButton = screen.getByTestId('origin-time-button')
    const destination = screen.getByTestId('destination-city')
    const submitButton = screen.getByTestId('submit-button')

    fireEvent.changeText(originCity, 'any-city')
    fireEvent.press(showDatePickerButton)
    waitFor(() =>
      fireEvent(
        screen.getByTestId('origin-date'),
        'onChange',
        ...createDateTimeSetEvtParams(fakeDate),
      ),
    )
    fireEvent.press(showTimePickerButton)
    waitFor(() =>
      fireEvent(
        screen.getByTestId('origin-time'),
        'onChange',
        ...createDateTimeSetEvtParams(fakeDate),
      ),
    )
    fireEvent.changeText(destination, 'any-city2')

    await waitFor(() => fireEvent.press(submitButton))

    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith('/announcements', {
        originCity: 'any-city',
        pickupOrDepartureDate: fakeDate,
        destinationCity: 'any-city2',
      })
    })
  })
})