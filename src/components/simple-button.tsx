import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { colors, fonts } from '@theme/index'

type Props = TouchableOpacityProps & {
  title: string
}

export function SimpleButton({ title, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 99,
  },
  buttonTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.secondary700,
  },
})
