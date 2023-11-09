import dayjs from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { DatePickerProps } from '@components/date-picker'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { colors, fonts } from '@theme/index'

export type TimePickerProps = {
  label: string
  placeholder?: string
  errorMessage?: string
  onControllerChange?: (date: Date | undefined) => void
  reset?: boolean
  testID?: string
}

export const TimePicker = forwardRef<TextInput, DatePickerProps>(
  (
    { label, placeholder, errorMessage, onControllerChange, reset, testID },
    ref,
  ) => {
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
        if (Platform.OS === 'android') {
          setShowPicker(false)
        }
      }
    }

    useEffect(() => {
      if (reset) {
        setSelectedDate(undefined)
      }
    }, [reset])

    return (
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row' }}>
          {/* This is needed because only inputs can focus on hook form */}
          <TextInput
            ref={ref}
            style={styles.fakeInput}
            value=""
            showSoftInputOnFocus={false}
            caretHidden
          />
          <Text style={labelStyle}>{label}</Text>
        </View>

        {showPicker && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <DateTimePicker
              testID={testID || 'time-picker'}
              value={selectedDate || new Date()}
              mode="time"
              display="inline"
              onChange={onChange}
            />
            {Platform.OS && (
              <TouchableOpacity
                style={styles.iOSButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.iOSButtonText}>Confirmar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!showPicker && (
          <Pressable
            testID={testID ? `${testID}-button` : 'button'}
            onPress={() => setShowPicker(true)}
            style={buttonContainerStyle}
          >
            <Text testID="button-text" style={buttonTextStyle}>
              {selectedDate ? dayjs(selectedDate).format('HH:mm') : placeholder}
            </Text>
          </Pressable>
        )}

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    )
  },
)

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
  },
  errorMessage: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.red,
  },
  iOSButton: {
    backgroundColor: colors.primary950,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  iOSButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white,
  },
  fakeInput: {
    width: 1,
    marginRight: -1,
  },
})
