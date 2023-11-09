import dayjs from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { colors, fonts } from '@theme/index'

export type DatePickerProps = {
  label: string
  placeholder?: string
  errorMessage?: string
  onControllerChange?: (date: Date | undefined) => void
  reset?: boolean
  testID?: string
}

export const DatePicker = forwardRef<TextInput, DatePickerProps>(
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
        currentDate?.setHours(23)
        currentDate?.setMinutes(59)
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
            <RNDateTimePicker
              testID={testID || 'date-picker'}
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
            testID={testID ? `${testID}-button` : 'button'}
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
    color: colors.secondary400,
  },
  errorMessage: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.red,
  },
  fakeInput: {
    width: 1,
    marginRight: -1,
  },
})
