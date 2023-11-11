import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { Button } from '@components/button'
import { useAuth } from '@hooks/useAuth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { colors, fonts } from '@theme/index'

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
  // webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  // iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
})

export function SignIn() {
  const { googleSignIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true)
      await GoogleSignin.hasPlayServices()
      await GoogleSignin.signIn()

      const { accessToken } = await GoogleSignin.getTokens()

      await googleSignIn(accessToken)
    } catch (error) {
      showMessage({
        message:
          'Ops, algo deu errado durante o processo. Tente novamente mais tarde. ',
        type: 'danger',
        duration: 5000,
      })
      setIsLoading(false)
    } finally {
      await GoogleSignin.signOut()
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
        <Button
          title="Entrar com Google"
          variant="secondary"
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        />
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
