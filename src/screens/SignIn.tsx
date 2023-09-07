import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

import { BlankSpacer } from '@components/BlackSpacer'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { colors, fonts } from '@theme/index'

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'O e-mail é obrigatório.' })
    .email('Formato de e-mail inválido.'),
  password: z
    .string({ required_error: 'A senha é obrigatória.' })
    .min(6, 'A senha precisa de no mínimo 6 caracteres.'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function SignIn() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleSignIn({ email, password }: LoginFormData) {
    console.log(email)
    console.log(password)
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                leftIcon="ios-person-outline"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                leftIcon="lock-closed-outline"
                placeholder="Senha"
                secureTextEntry={isPasswordHidden}
                onChangeText={onChange}
                rightIcon={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                rightIconOnPress={() => setIsPasswordHidden((prev) => !prev)}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <BlankSpacer height={12} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSignIn)}
          >
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
