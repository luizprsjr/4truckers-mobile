import { Text, TouchableOpacity, View } from 'react-native'

import { Header } from '@components/Header'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

export function Profile() {
  const { navigate } = useNavigation()
  const { signOut } = useAuth()

  function handleWithSignOut() {
    signOut()
  }

  return (
    <View>
      <Header />

      <Text>Profile</Text>
      <TouchableOpacity onPress={handleWithSignOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}
