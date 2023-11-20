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

    const borderStyle = {
      ...styles.inputContainer,
      borderColor: errorMessage
        ? colors.red
        : isFocused
        ? colors.primary700
        : colors.secondary400,
      borderWidth: errorMessage ? 2 : 1,
    }

    return (
      <View style={{ gap: 4 }}>
        <Text style={[styles.label]}>{label}</Text>

        <View
          testID="container"
          style={[
            multiline ? styles.multilineContainer : styles.inputContainer,
            borderStyle,
          ]}
        >
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder || '______________'}
            placeholderTextColor={colors.secondary400}
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
    color: colors.secondary400,
    textTransform: 'none',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.secondary400,
    borderWidth: 1,
    borderRadius: 8,
  },
  multilineContainer: {
    borderColor: colors.secondary400,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 12,
    width: '100%',
    minHeight: 100,
  },
  input: {
    flex: 1,
    height: 52,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  measurementUnit: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary400,
    marginRight: 16,
  },
  errorMessage: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.red,
  },
})
