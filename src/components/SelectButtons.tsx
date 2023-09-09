import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '@theme/index'

type Props = {
  selectedUserType: 'USER' | 'TRUCKER' | undefined
  onChange: (...event: any[]) => void
}

export function SelectButtons({ selectedUserType, onChange }: Props) {
  return (
    <View style={styles.selectTypeContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedUserType === 'USER' && styles.selectedButton,
        ]}
        onPress={() => onChange('USER')}
      >
        <Text
          style={
            selectedUserType === 'USER'
              ? styles.selectedText
              : styles.buttonText
          }
        >
          Usuário
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedUserType === 'TRUCKER' && styles.selectedButton,
        ]}
        onPress={() => onChange('TRUCKER')}
      >
        <Text
          style={
            selectedUserType === 'TRUCKER'
              ? styles.selectedText
              : styles.buttonText
          }
        >
          Caminhoneiro
        </Text>
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
    borderColor: colors.secondary400,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: colors.primary700,
    borderColor: colors.primary700,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
  },
  selectedText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.white,
  },
})
