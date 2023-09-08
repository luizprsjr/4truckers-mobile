import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@services/api'
import { colors, fonts } from '@theme/index'
import { AppError } from '@utils/AppError'
import { formatPhoneNumber } from '@utils/formatPhoneNumber'

const phoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/

const signUpFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Por favor, informe seu nome.' })
      .min(3, 'A senha deve ter pelo menos 3 caracteres.'),
    email: z
      .string({ required_error: 'Por favor, forneça um e-mail válido.' })
      .email('Por favor, insira um formato de e-mail válido.'),
    password: z
      .string({ required_error: 'Por favor, forneça uma senha.' })
      .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z
      .string({ required_error: 'Por favor, confirme a senha.' })
      .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Número inválido. Informe o DDD + número.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      'As senhas não correspondem. Por favor, verifique e tente novamente.',
    path: ['confirmPassword'],
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleRegisterNewUser({
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  }: SignUpFormData) {
    try {
      const { data, status } = await api.post('/users', {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber: phoneNumber.replace(/\D/g, ''),
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
    <View style={{ flex: 1 }}>
      <Header hasBackButton />

      <View style={styles.wrapper}>
        <View style={styles.form}>
          <Text style={styles.title}>Criar conta</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                leftIcon="ios-person-outline"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                leftIcon="mail-outline"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                leftIcon="lock-closed-outline"
                placeholder="Senha"
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                onChangeText={onChange}
                rightIcon={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                rightIconOnPress={() => setIsPasswordHidden((prev) => !prev)}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                leftIcon="lock-closed-outline"
                placeholder="Confirme a senha"
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                onChangeText={onChange}
                rightIcon={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                rightIconOnPress={() => setIsPasswordHidden((prev) => !prev)}
                value={value}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                leftIcon="phone-portrait-outline"
                placeholder="Celular + DDD"
                onChangeText={(text) => {
                  const formattedText = formatPhoneNumber(text)
                  onChange(formattedText)
                }}
                value={value}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />

          <Button
            title="Criar conta"
            onPress={handleSubmit(handleRegisterNewUser)}
            // isLoading={isLoading}
          />
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
})
