import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  function handleAddNewAccount() {
    navigate('signUp')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignIn</Text>
      <TouchableOpacity onPress={handleAddNewAccount}>
        <Text>new account</Text>
      </TouchableOpacity>
    </View>
  )
}
