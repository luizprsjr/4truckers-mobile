import { forwardRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { colors, fonts } from '@theme/index'

export type InputProps = TextInputProps & {
  leftIcon?: keyof typeof Ionicons.glyphMap
  rightIcon?: keyof typeof Ionicons.glyphMap
  rightIconOnPress?: () => void
  errorMessage?: string
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ leftIcon, rightIcon, rightIconOnPress, errorMessage, ...rest }, ref) => {
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
      <>
        <View
          testID="container"
          style={[styles.inputContainer, { borderColor: inputColor }]}
        >
          {leftIcon && (
            <Ionicons
              testID="left-icon"
              style={{ paddingLeft: 16 }}
              name={leftIcon}
              size={24}
              color={inputColor}
            />
          )}
          <TextInput
            ref={ref}
            style={[styles.input, { color: inputColor }]}
            placeholderTextColor={inputColor}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />
          {rightIcon && (
            <TouchableOpacity testID="right-icon" onPress={rightIconOnPress}>
              <Ionicons
                style={{ paddingRight: 16 }}
                name={rightIcon}
                size={24}
                color={colors.primary700}
              />
            </TouchableOpacity>
          )}
        </View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </>
    )
  },
)

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary700,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    minHeight: 60,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
  },
  errorMessage: {
    color: colors.red,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
})
