import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import {} from '@expo/vector-icons/Ionicons'
import { colors, fonts } from '@theme/index'

type Props = TextInputProps & {
  leftIcon?: keyof typeof Ionicons.glyphMap
  rightIcon?: keyof typeof Ionicons.glyphMap
  rightIconOnPress?: () => void
  errorMessage?: string
}

export function Input({
  leftIcon,
  rightIcon,
  rightIconOnPress,
  errorMessage,
  ...rest
}: Props) {
  return (
    <>
      <View style={styles.inputContainer}>
        <Ionicons
          style={{ paddingLeft: 16 }}
          name={leftIcon}
          size={24}
          color={colors.secondary400}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.secondary400}
          {...rest}
        />
        <TouchableOpacity onPress={rightIconOnPress}>
          <Ionicons
            style={{ paddingRight: 16 }}
            name={rightIcon}
            size={24}
            color={colors.primary700}
          />
        </TouchableOpacity>
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </>
  )
}

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
    height: 60,
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
