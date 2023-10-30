import { Platform } from 'react-native'

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { TimePicker } from './time-picker'

export const createDateTimeSetEvtParams = (
  date: Date,
): [DateTimePickerEvent, Date] => {
  return [
    {
      type: 'set',
      nativeEvent: {
        timestamp: date.getTime(),
      },
    },
    date,
  ]
}

const date = new Date('2022-12-12T12:00:00.000-03:00')

describe('component: TimePicker', () => {
  it('should not show picker if the button is not pressed', async () => {
    render(<TimePicker label="test" />)
    expect(screen.queryByTestId('time-picker')).toBeNull()
  })

  it('should show picker if the button is pressed', async () => {
    render(<TimePicker label="test" />)
    const showPickerButton = screen.getByTestId('text-date')
    fireEvent.press(showPickerButton)
    expect(screen.queryByTestId('time-picker')).toBeTruthy()
  })

  it('should select the correct time on iOS', async () => {
    Platform.OS = 'ios'
    render(<TimePicker label="test" />)
    const showPickerButton = screen.getByTestId('text-date')
    fireEvent.press(showPickerButton)
    waitFor(() =>
      fireEvent(
        screen.getByTestId('time-picker'),
        'onChange',
        ...createDateTimeSetEvtParams(date),
      ),
    )
    fireEvent.press(screen.getByText(/confirmar/i))
    expect(await screen.findByTestId('text-date')).toHaveTextContent('12:00')
  })

  it('should select the correct time on Android', async () => {
    Platform.OS = 'android'
    render(<TimePicker label="test" />)
    const showPickerButton = screen.getByTestId('text-date')
    fireEvent.press(showPickerButton)
    waitFor(() =>
      fireEvent(
        screen.getByTestId('time-picker'),
        'onChange',
        ...createDateTimeSetEvtParams(date),
      ),
    )
    expect(await screen.findByTestId('text-date')).toHaveTextContent('12:00')
  })

  it('should show the placeholder text if the date is not selected', async () => {
    render(<TimePicker label="test" placeholder="placeholder text" />)
    expect(screen.getByText(/placeholder text/i)).toBeTruthy()
  })

  it('should show the error message if an error is send', async () => {
    render(<TimePicker label="test" errorMessage="error message" />)
    expect(screen.getByText(/error message/i)).toBeTruthy()
  })
})
