import { forwardRef, useCallback, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

import { colors, fonts } from '@theme/index'

export type InputInfoProps = TextInputProps & {
  label: string
  multiline?: boolean
  measurementUnit?: string
  placeholder?: string
  errorMessage?: string
}

export const InputInfo = forwardRef<TextInput, InputInfoProps>(
  (
    { errorMessage, label, multiline, placeholder, measurementUnit, ...rest },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const onBlur = useCallback(() => setIsFocused(false), [])
    const onFocus = useCallback(() => setIsFocused(true), [])

    const inputColor = errorMessage
      ? colors.red
      : isFocused
      ? colors.primary700
      : colors.secondary400

    return (
      <View style={{ gap: 4 }}>
        <Text style={[styles.label, { color: inputColor }]}>{label}</Text>

        <View
          testID="container"
          style={[
            multiline ? styles.multilineContainer : styles.inputContainer,
            { borderColor: inputColor },
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, { color: inputColor }]}
            placeholder={placeholder || '______________'}
            placeholderTextColor={inputColor}
            multiline={multiline}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />
          {measurementUnit && (
            <Text style={styles.measurementUnit}>{measurementUnit}</Text>
          )}
        </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.secondary700,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  multilineContainer: {
    borderColor: colors.secondary700,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: '100%',
    minHeight: 100,
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
