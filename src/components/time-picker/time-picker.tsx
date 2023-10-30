import dayjs from 'dayjs'
import { useState } from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { colors, fonts } from '@theme/index'

type TimePickerProps = {
  label: string
  placeholder?: string
  errorMessage?: string
  onChange?: (date: Date | undefined) => void
}

export function TimePicker({
  label,
  placeholder,
  errorMessage,
  onChange,
}: TimePickerProps) {
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
      if (Platform.OS === 'android') {
        setShowPicker(false)
      }
    }
  }

  return (
    <View style={{ gap: 4 }}>
      <Text style={styles.label}>{label}</Text>

      {showPicker && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DateTimePicker
            testID="time-picker"
            value={selectedDate || new Date()}
            minimumDate={new Date()}
            mode="time"
            // is24Hour
            display="inline"
            onChange={onPickerChange}
          />
          {Platform.OS && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary950,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}
              onPress={() => setShowPicker(false)}
            >
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 14,
                  color: colors.white,
                }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {!showPicker && (
        <Pressable
          onPress={() => setShowPicker(true)}
          style={styles.inputContainer}
        >
          <Text testID="text-date" style={styles.input}>
            {selectedDate ? dayjs(selectedDate).format('HH:mm') : placeholder}
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
