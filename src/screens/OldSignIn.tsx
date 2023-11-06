import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { Header } from '@components/header'
import { ControlledInput } from '@components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { colors, fonts } from '@theme/index'
import { AppError } from '@utils/AppError'

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'Por favor, forneça um e-mail válido.' })
    .email('Por favor, insira um formato de e-mail válido.'),
  password: z
    .string({ required_error: 'Por favor, forneça uma senha.' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function OldSignIn() {
  const { signIn } = useAuth()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleSignIn({ email, password }: LoginFormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      console.log(title) // TODO: create a toast
      setIsLoading(false)
    }
  }

  function handleAddNewAccount() {
    navigate('signUp')
  }

  return (
    <View style={{ flex: 1 }}>
      <Header isLarge />

      <View style={styles.wrapper}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          <ControlledInput
            control={control}
            name="email"
            leftIcon="ios-person-outline"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ControlledInput
            control={control}
            name="password"
            leftIcon="lock-closed-outline"
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry={isPasswordHidden}
            rightIcon={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
            rightIconOnPress={() => setIsPasswordHidden((prev) => !prev)}
          />

          <BlankSpacer height={12} />
          <Button
            title="Entrar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
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
  title: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  addNewAccount: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary700,
    textAlign: 'center',
    marginTop: 24,
  },
})
