import { ActivityIndicator, View } from 'react-native'

import { colors } from '@theme/index'

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator color={colors.primary500} />
    </View>
  )
}
