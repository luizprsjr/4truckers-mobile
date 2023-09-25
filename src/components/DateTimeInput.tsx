import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

import {} from '@expo/vector-icons/Ionicons'
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { colors, fonts } from '@theme/index'

import { SimpleButton } from './SimpleButton'

type Props = {
  withTimer?: boolean
  label: string
  placeholder?: string
  errorMessage?: string
  reset: boolean
  onChange?: (date: Date | undefined) => void
}

export function DateTimeInput({
  withTimer = false,
  label,
  errorMessage,
  placeholder,
  reset,
  onChange,
}: Props) {
  const [date, setDate] = useState<Date | undefined>()
  const [dateString, setDateString] = useState<string>()
  const [mode, setMode] = useState<'date' | 'time'>('date')

  const [showDatePicker, setShowDatePicker] = useState(false)

  function onChangeIosDatePicker(
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) {
    const currentDate = selectedDate
    setDate(currentDate)
    setDateString(dayjs(currentDate).format('DD/MM/YYYY [às] HH:mm'))
    if (onChange) {
      onChange(currentDate)
    }
  }

  function onChangeAndroidDatePicker(
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) {
    const currentDate = selectedDate
    setDate(currentDate)
    setDateString(dayjs(currentDate).format('DD/MM/YYYY [às] HH:mm'))
    if (onChange) {
      onChange(currentDate)
    }
    if (withTimer) {
      showAndroidPicker('time', currentDate)
    }
  }

  function onChangeAndroidTimePicker(
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) {
    const currentDate = selectedDate
    setDate(currentDate)
    setDateString(dayjs(currentDate).format('DD/MM/YYYY [às] HH:mm'))
    if (onChange) {
      onChange(currentDate)
    }
  }

  function showAndroidPicker(currentMode: 'date' | 'time', currentDate?: Date) {
    DateTimePickerAndroid.open({
      value: currentDate || new Date(),
      onChange:
        currentMode === 'date'
          ? onChangeAndroidDatePicker
          : onChangeAndroidTimePicker,
      mode: currentMode,
      is24Hour: true,
    })
  }

  function handleWithCancelIosPicker() {
    if (mode === 'date') {
      setShowDatePicker(false)
      setDate(undefined)
      setDateString('')
      setMode('date')

      if (onChange) {
        onChange(undefined)
      }
    } else {
      setShowDatePicker(false)
      setMode('date')
    }
  }

  function handleWithConfirmIosPicker() {
    if (mode === 'date') {
      setMode('time')
    } else {
      setShowDatePicker(false)
      setMode('date')
    }
  }

  function togglePicker() {
    if (Platform.OS === 'android') {
      showAndroidPicker('date')
    } else {
      setShowDatePicker(true)
    }
  }

  useEffect(() => {
    if (reset) {
      setDateString('')
    }
  }, [reset])

  return (
    <View style={{ gap: 4 }}>
      <Text style={styles.label}>{label}</Text>

      {showDatePicker && Platform.OS === 'ios' && (
        <>
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            display="spinner"
            onChange={onChangeIosDatePicker}
          />

          <View style={styles.iosPickerButtons}>
            <SimpleButton
              title="Cancelar"
              onPress={handleWithCancelIosPicker}
            />
            <SimpleButton
              title={mode === 'date' ? 'Escolher horário' : 'Confirmar'}
              onPress={handleWithConfirmIosPicker}
            />
          </View>
        </>
      )}

      {!showDatePicker && (
        <Pressable onPress={togglePicker} style={styles.inputContainer}>
          <Text style={styles.input}>{dateString || placeholder}</Text>
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
