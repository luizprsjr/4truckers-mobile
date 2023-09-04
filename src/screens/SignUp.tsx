import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const { goBack } = useNavigation()

  function handleGoBack() {
    goBack()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignUp</Text>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>back to login</Text>
      </TouchableOpacity>
    </View>
  )
}
