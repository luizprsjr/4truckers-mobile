import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { Button } from '@components/Button'
import { useAuth } from '@hooks/useAuth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { colors, fonts } from '@theme/index'

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
  webClientId:
    '816122311851-5616c53npqnaboaiirftf6g3si723a7d.apps.googleusercontent.com',
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
      if (error instanceof Error) {
        Alert.alert(error.message)
      }

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
          isLight
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
