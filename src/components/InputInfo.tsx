import { useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

import {} from '@expo/vector-icons/Ionicons'
import { colors, fonts } from '@theme/index'

type Props = TextInputProps & {
  label: string
  measurementUnit?: string
  placeholder?: string
  errorMessage?: string
}

export function InputInfo({
  label,
  measurementUnit,
  placeholder,
  errorMessage,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const inputColor = errorMessage
    ? colors.red
    : isFocused
    ? colors.primary700
    : colors.secondary400

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <View style={{ gap: 4 }}>
      <Text style={[styles.label, { color: inputColor }]}>{label}</Text>

      <View style={[styles.inputContainer, { borderColor: inputColor }]}>
        <TextInput
          style={[styles.input, { color: inputColor }]}
          placeholder={placeholder || '______________'}
          placeholderTextColor={inputColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {measurementUnit && (
          <Text style={styles.measurementUnit}>{measurementUnit}</Text>
        )}
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
    textTransform: 'capitalize',
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
    flex: 1,
    height: 44,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
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
})
