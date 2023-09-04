import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, fonts } from '@theme/index'

const iconSize = 28
const marginLeft = 32

export function Header() {
  const { goBack } = useNavigation()
  const { name } = useRoute()

  return (
    <View style={styles.container}>
      {name !== 'home' && (
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={iconSize} color={colors.white} />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          <Text style={styles.number}>4</Text>Truckers
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary950,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  backButton: {
    marginLeft,
    marginRight: -marginLeft - iconSize,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontFamily: fonts.logo,
    fontSize: 24,
    color: colors.white,
  },
  number: {
    fontFamily: fonts.logo,
    fontSize: 24,
    color: colors.primary500,
  },
})
