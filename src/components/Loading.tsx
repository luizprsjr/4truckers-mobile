import { ActivityIndicator, View } from 'react-native'

import { colors } from '@theme/index'

type Props = {
  color?: string
}

export function Loading({ color }: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator color={color || colors.primary500} />
    </View>
  )
}
