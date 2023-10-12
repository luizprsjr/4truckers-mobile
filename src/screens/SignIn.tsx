import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { Button } from '@components/Button'
import { useAuth } from '@hooks/useAuth'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { colors, fonts } from '@theme/index'

export function SignIn() {
  // const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  // const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  async function handleSignIn() {
    try {
      setIsLoading(true)
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      })
    } catch (error) {
      console.log(error)
      // const isAppError = error instanceof AppError
      // const title = isAppError
      //   ? error.message
      //   : 'Não foi possível entrar. Tente novamente mais tarde.'

      // console.log(title) // TODO: create a toast
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={[styles.container]}>
      <Text style={styles.logo}>
        <Text style={styles.number}>4</Text>Truckers
      </Text>

      <View
        style={{ width: '100%', position: 'absolute', bottom: 60, zIndex: 1 }}
      >
        <Button title="Entrar com Google" isLight />
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            console.log('fsdifsdu')
          }}
          disabled={false}
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary950,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logo: {
    fontFamily: fonts.logo,
    fontSize: 32,
    color: colors.white,
    marginTop: -120,
  },
  number: {
    fontFamily: fonts.logo,
    fontSize: 32,
    color: colors.primary500,
  },
})
