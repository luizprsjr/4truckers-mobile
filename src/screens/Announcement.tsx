import { Text, TouchableOpacity, View } from 'react-native'

import { Header } from '@components/header'
import { useNavigation } from '@react-navigation/native'

export function Announcement() {
  const { navigate } = useNavigation()

  function handleButton() {
    console.warn('warn')
  }

  return (
    <View>
      <Header />

      <Text>Announcement</Text>
      <TouchableOpacity onPress={handleButton}>
        <Text>new account</Text>
      </TouchableOpacity>
    </View>
  )
}
