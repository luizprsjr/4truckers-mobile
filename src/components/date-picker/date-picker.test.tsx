import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { DatePicker } from './date-picker'

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

describe('component: DatePicker', () => {
  it('should not show picker if the button is not pressed', async () => {
    render(<DatePicker label="test" />)
    expect(screen.queryByTestId('date-picker')).toBeNull()
  })

  it('should show picker if the button is pressed', async () => {
    render(<DatePicker label="test" />)
    const showPickerButton = screen.getByTestId('text-date')
    fireEvent.press(showPickerButton)
    expect(screen.queryByTestId('date-picker')).toBeTruthy()
  })

  it('should select the correct date', async () => {
    render(<DatePicker label="test" />)
    const showPickerButton = screen.getByTestId('text-date')
    fireEvent.press(showPickerButton)
    waitFor(() =>
      fireEvent(
        screen.getByTestId('date-picker'),
        'onChange',
        ...createDateTimeSetEvtParams(date),
      ),
    )
    expect(await screen.findByTestId('text-date')).toHaveTextContent(
      '12/12/2022',
    )
  })

  it('should show the placeholder text if the date is not selected', async () => {
    render(<DatePicker label="test" placeholder="placeholder text" />)
    expect(screen.getByText(/placeholder text/i)).toBeTruthy()
  })

  it('should show the error message if an error is send', async () => {
    render(<DatePicker label="test" errorMessage="error message" />)
    expect(screen.getByText(/error message/i)).toBeTruthy()
  })
})
