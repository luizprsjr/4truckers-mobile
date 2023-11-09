import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

export function createDateTimeSetEvtParams(
  date: Date,
): [DateTimePickerEvent, Date] {
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
