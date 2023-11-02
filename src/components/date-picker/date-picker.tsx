import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import DateDatePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { colors, fonts } from '@theme/index'

export type DatePickerProps = {
  label: string
  placeholder?: string
  errorMessage?: string
  onControllerChange?: (date: Date | undefined) => void
  reset?: boolean
}

export function DatePicker({
  label,
  placeholder,
  errorMessage,
  onControllerChange,
  reset,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [showPicker, setShowPicker] = useState(false)

  const labelStyle = {
    ...styles.label,
    color: errorMessage ? colors.red : colors.secondary400,
  }

  const buttonContainerStyle = {
    ...styles.buttonContainer,
    borderColor: errorMessage ? colors.red : colors.secondary400,
  }

  const buttonTextStyle = {
    ...styles.buttonText,
    color: errorMessage ? colors.red : colors.secondary400,
  }

  function onChange(
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) {
    if (event.type === 'set') {
      const currentDate = selectedDate
      setSelectedDate(currentDate)
      if (onControllerChange) {
        onControllerChange(currentDate)
      }
      setShowPicker(false)
    }
  }

  useEffect(() => {
    if (reset) {
      setSelectedDate(undefined)
    }
  }, [reset])

  return (
    <View style={{ gap: 4 }}>
      <Text style={labelStyle}>{label}</Text>

      {showPicker && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DateDatePicker
            testID="date-picker"
            value={selectedDate || new Date()}
            minimumDate={new Date()}
            mode="date"
            display="default"
            onChange={onChange}
          />
        </View>
      )}

      {!showPicker && (
        <Pressable
          testID="button-container"
          onPress={() => setShowPicker(true)}
          style={buttonContainerStyle}
        >
          <Text testID="button-text" style={buttonTextStyle}>
            {selectedDate
              ? dayjs(selectedDate).format('DD/MM/YYYY')
              : placeholder}
          </Text>
        </Pressable>
      )}

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
    textTransform: 'none',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  buttonText: {
    lineHeight: 44,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
  },
  errorMessage: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.red,
  },
})
