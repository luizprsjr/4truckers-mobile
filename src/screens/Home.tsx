import { Text, TouchableOpacity, View } from 'react-native'

import { Header } from '@components/Header'
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const { navigate } = useNavigation()

  function handleButton() {
    console.warn('warn')
  }

  return (
    <View>
      <Header />
      <Text>Home</Text>
      <TouchableOpacity onPress={handleButton}>
        <Text>new account</Text>
      </TouchableOpacity>
    </View>
  )
}
