import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { UseFormStateReturn } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import DateDatePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { colors, fonts } from '@theme/index'

type DatePickerProps = {
  label: string
  placeholder?: string
  errorMessage?: string
  onChange?: (date: Date | undefined) => void
  formState?: UseFormStateReturn<any>
}

export function DatePicker({
  label,
  placeholder,
  errorMessage,
  onChange,
  formState,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [showPicker, setShowPicker] = useState(false)

  function onPickerChange(
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) {
    if (event.type === 'set') {
      const currentDate = selectedDate
      setSelectedDate(currentDate)
      if (onChange) {
        onChange(currentDate)
      }
      setShowPicker(false)
    }
  }

  useEffect(() => {
    if (formState?.isSubmitSuccessful) {
      setSelectedDate(undefined)
    }
  }, [formState])

  return (
    <View style={{ gap: 4 }}>
      <Text style={styles.label}>{label}</Text>

      {showPicker && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DateDatePicker
            testID="date-picker"
            value={selectedDate || new Date()}
            minimumDate={new Date()}
            mode="date"
            // is24Hour
            display="default"
            onChange={onPickerChange}
          />
        </View>
      )}

      {!showPicker && (
        <Pressable
          onPress={() => setShowPicker(true)}
          style={styles.inputContainer}
        >
          <Text testID="text-date" style={styles.input}>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.secondary700,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    lineHeight: 44,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
  },
  measurementUnit: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary700,
  },
  errorMessage: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.red,
  },
  iosPickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
