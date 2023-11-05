import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { colors, fonts } from '@theme/index'

type Props = {
  hasBackButton?: boolean
  isLarge?: boolean
}

const iconSize = 28
const marginLeft = 32

export function Header({ hasBackButton = false, isLarge = false }: Props) {
  const { goBack } = useNavigation()

  const containerStyle = {
    ...styles.container,
    paddingVertical: isLarge ? 86 : 32,
  }

  return (
    <View testID="container" style={containerStyle}>
      {hasBackButton && (
        <TouchableOpacity
          testID="back-button"
          style={styles.backButton}
          onPress={() => goBack()}
        >
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
  },
  backButton: {
    marginLeft,
    marginRight: -marginLeft - iconSize,
    zIndex: 1,
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
