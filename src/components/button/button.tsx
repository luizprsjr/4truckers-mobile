import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { Loading } from '@components/Loading'
import { colors, fonts } from '@theme/index'

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
  variant?: 'default' | 'secondary'
}

export function Button({
  title,
  disabled,
  isLoading = false,
  variant = 'default',
  ...rest
}: Props) {
  const themeColors = {
    default: {
      backgroundColor: colors.primary950,
      textColor: colors.white,
    },
    secondary: {
      backgroundColor: colors.white,
      textColor: colors.primary950,
    },
  }

  const buttonStyle = {
    ...styles.button,
    opacity: isLoading || disabled ? 0.5 : 1,
    backgroundColor: themeColors[variant].backgroundColor,
  }

  const titleStyle = {
    ...styles.buttonTitle,
    color: themeColors[variant].textColor,
  }

  return (
    <TouchableOpacity
      testID="button"
      style={buttonStyle}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loading color={colors.white} />
      ) : (
        <Text style={titleStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
  },
  buttonTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
})
