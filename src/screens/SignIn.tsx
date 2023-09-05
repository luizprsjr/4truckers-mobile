import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { BlankSpacer } from '@components/BlackSpacer'
import { Header } from '@components/Header'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { colors, fonts } from '@theme/index'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  function handleSignIn() {
    console.log('signIn')
  }

  function handleAddNewAccount() {
    navigate('signUp')
  }

  return (
    <View style={{ flex: 1 }}>
      <Header isLarge />

      <View style={styles.wrapper}>
        <View style={styles.form}>
          <Text style={styles.login}>Login</Text>
          <TextInput style={styles.input} placeholder="digite seu e-mail" />
          <TextInput style={styles.input} placeholder="digite sua senha" />
          <BlankSpacer height={12} />
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonTitle}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddNewAccount}>
            <Text style={styles.addNewAccount}>criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 32,
    gap: 8,
  },
  login: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primary700,
    borderRadius: 8,
    height: 60,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.primary950,
    borderRadius: 8,
  },
  buttonTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
  addNewAccount: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary700,
    textAlign: 'center',
    marginTop: 24,
  },
})
