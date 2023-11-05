import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '@theme/index'

export type SelectButtonsProps = {
  selected?: 'USER' | 'TRUCKER'
  onChange: (...event: any[]) => void
}

export function SelectButtons({
  selected = 'USER',
  onChange,
}: SelectButtonsProps) {
  const userButtonStyle = {
    ...styles.button,
    backgroundColor: selected === 'USER' ? colors.primary700 : 'transparent',
    borderColor: selected === 'USER' ? colors.primary700 : colors.secondary400,
  }

  const userButtonText = {
    ...styles.buttonText,
    color: selected === 'USER' ? colors.white : colors.secondary400,
  }

  const truckerButtonStyle = {
    ...styles.button,
    backgroundColor: selected === 'TRUCKER' ? colors.primary700 : 'transparent',
    borderColor:
      selected === 'TRUCKER' ? colors.primary700 : colors.secondary400,
  }

  const truckerButtonText = {
    ...styles.buttonText,
    color: selected === 'TRUCKER' ? colors.white : colors.secondary400,
  }

  return (
    <View style={styles.selectTypeContainer}>
      <TouchableOpacity
        testID="user-button"
        style={userButtonStyle}
        onPress={() => onChange('USER')}
      >
        <Text style={userButtonText}>Usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="trucker-button"
        style={truckerButtonStyle}
        onPress={() => onChange('TRUCKER')}
      >
        <Text style={truckerButtonText}>Caminhoneiro</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  selectTypeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    maxWidth: '50%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
})
