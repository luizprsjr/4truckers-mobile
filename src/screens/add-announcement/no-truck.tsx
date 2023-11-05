import { StyleSheet, Text, View } from 'react-native'

import { Header } from '@components/header'
import { SimpleButton } from '@components/simple-button'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'

export function NoTruck() {
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  function handleAddTruck() {
    navigate('addTruck')
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.text}>
          Antes de criar um anúncio, é importante que você forneça algumas
          informações sobre o seu caminhão.
        </Text>

        <SimpleButton title="registrar caminhão" onPress={handleAddTruck} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
    marginBottom: 16,
    textAlign: 'center',
  },
})
