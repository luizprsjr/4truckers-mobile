import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export function Announcement() {
  const { navigate } = useNavigation()

  function handleButton() {
    console.warn('warn')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Announcement</Text>
      <TouchableOpacity onPress={handleButton}>
        <Text>new account</Text>
      </TouchableOpacity>
    </View>
  )
}
