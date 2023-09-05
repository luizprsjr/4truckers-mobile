import axios from 'axios'
import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export function SignUp() {
  const { goBack } = useNavigation()

  function handleGoBack() {
    goBack()
  }

  async function handleRegisterNewUser() {
    try {
      const { data, status } = await api.post('/users', {
        name: 'App Test',
        email: 'apptest@gmail.com',
        password: '123456',
        confirmPassword: '123456',
        phoneNumber: '2499999999911',
      })

      console.log(data, status)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'
      console.warn(message)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignUp</Text>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>back to login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisterNewUser}>
        <Text>crete new user</Text>
      </TouchableOpacity>
    </View>
  )
}
