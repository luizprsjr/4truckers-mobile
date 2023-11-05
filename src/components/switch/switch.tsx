import {
  Platform,
  StyleSheet,
  Switch as SwitchRN,
  SwitchProps,
  Text,
  View,
} from 'react-native'

import { colors, fonts } from '@theme/index'

export type SwitchComponentProps = SwitchProps & {
  label: string
}

export function Switch({ label, ...rest }: SwitchComponentProps) {
  return (
    <View style={styles.canStack}>
      <Text style={styles.label}>{label}</Text>
      <SwitchRN
        testID="switch"
        trackColor={{
          false: colors.secondary400,
          true: colors.primary700,
        }}
        thumbColor={colors.secondary100}
        ios_backgroundColor={colors.secondary300}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  canStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'ios' ? 4 : 0,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
    textTransform: 'none',
  },
})
