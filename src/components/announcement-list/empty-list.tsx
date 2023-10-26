import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts } from '@theme/index'

export function EmptyList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Desculpe, não há anúncios ativos no momento.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
  },
})
