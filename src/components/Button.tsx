import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { colors, fonts } from '@theme/index'

import { Loading } from './Loading'

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
  isLight?: boolean
}

export function Button({
  title,
  disabled,
  isLoading = false,
  isLight = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          opacity: isLoading || disabled ? 0.5 : 1,
          backgroundColor: isLight ? colors.white : colors.primary950,
        },
      ]}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <Loading color={colors.white} />
      ) : (
        <Text
          style={[
            styles.buttonTitle,
            { color: isLight ? colors.primary950 : colors.white },
          ]}
        >
          {title}
        </Text>
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
