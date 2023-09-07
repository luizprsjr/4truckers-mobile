import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { BlankSpacer } from '@components/BlackSpacer'
import { Header } from '@components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { colors, fonts } from '@theme/index'

export function SignIn() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="digite seu e-mail"
              placeholderTextColor={colors.secondary400}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="digite sua senha"
              secureTextEntry={isPasswordHidden}
              placeholderTextColor={colors.secondary400}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordHidden((prev) => !prev)}
            >
              <Ionicons
                style={{ padding: 16 }}
                name={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={colors.primary700}
              />
            </TouchableOpacity>
          </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary700,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: 60,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
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
