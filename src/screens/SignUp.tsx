import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { z } from 'zod'

import { BlankSpacer } from '@components/BlackSpacer'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
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
    type: z.enum(['USER', 'TRUCKER']).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      'As senhas não correspondem. Por favor, verifique e tente novamente.',
    path: ['confirmPassword'],
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })
  const selectedUserType = watch('type', 'USER')

  async function handleSignUp({
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    type,
  }: SignUpFormData) {
    try {
      setIsLoading(true)
      const { status } = await api.post('/users', {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        type,
      })
      if (status === 201) {
        await signIn(email, password)
      }
    } catch (error) {
      setIsLoading(false)
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
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
                keyboardType="number-pad"
                onChangeText={(text) => {
                  const formattedText = formatPhoneNumber(text)
                  onChange(formattedText)
                }}
                value={value}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />

          <BlankSpacer height={4} />
          <Text style={styles.textLabel}>Selecione o tipo de usuário:</Text>
          <Controller
            name="type"
            control={control}
            defaultValue="USER"
            render={({ field: { onChange } }) => (
              <View style={styles.selectTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedUserType === 'USER' && styles.selectedButton,
                  ]}
                  onPress={() => onChange('USER')}
                >
                  <Text
                    style={
                      selectedUserType === 'USER'
                        ? styles.selectedText
                        : styles.buttonText
                    }
                  >
                    Usuário
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedUserType === 'TRUCKER' && styles.selectedButton,
                  ]}
                  onPress={() => onChange('TRUCKER')}
                >
                  <Text
                    style={
                      selectedUserType === 'TRUCKER'
                        ? styles.selectedText
                        : styles.buttonText
                    }
                  >
                    Caminhoneiro
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 14,
                  color: colors.primary500,
                }}
              >
                Termos e condições
              </Text>
              <Text
                style={[
                  styles.textLabel,
                  {
                    fontFamily: fonts.regular,
                    fontSize: 13,
                  },
                ]}
              >
                Li e concordo com os termos e condições:
              </Text>
            </View>
            <Switch
              trackColor={{
                false: colors.secondary400,
                true: colors.primary700,
              }}
              thumbColor={colors.secondary100}
              ios_backgroundColor={colors.secondary300}
              onValueChange={() => setHasAcceptedTerms((prev) => !prev)}
              value={hasAcceptedTerms}
            />
          </View>

          <Button
            title={hasAcceptedTerms ? 'Criar conta' : 'Aceite os termos'}
            onPress={handleSubmit(handleSignUp)}
            disabled={!hasAcceptedTerms}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
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

  textLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary500,
  },
  selectTypeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    maxWidth: '50%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary400,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: colors.primary700,
    borderColor: colors.primary700,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
  },
  selectedText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.white,
  },
})
