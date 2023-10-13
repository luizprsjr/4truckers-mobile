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
import { SelectButtons } from '@components/SelectButtons'
import { TermsModal } from '@components/TermsModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { colors, fonts } from '@theme/index'
import { AppError } from '@utils/AppError'
import { formatPhoneNumber } from '@utils/formatPhoneNumber'

const phoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/

const signUpFormSchema = z.object({
  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Número inválido. Informe o DDD + número.'),
  type: z.enum(['USER', 'TRUCKER']).optional(),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function AddUserInfo() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { updateUser, user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })
  const selectedUserType = watch('type', 'USER')

  async function handleSignUp({ phoneNumber, type }: SignUpFormData) {
    try {
      setIsLoading(true)
      const { data, status } = await api.put('/users', {
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        type,
      })

      if (status === 200) {
        await updateUser(data.user)
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

  function acceptTerms() {
    setHasAcceptedTerms(true)
    setIsModalVisible(false)
  }

  function declineTerms() {
    setHasAcceptedTerms(false)
    setIsModalVisible(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <Header isLarge />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.form}>
          <Text style={styles.title}>{`Olá, ${user.name}`}</Text>
          <Text>
            Antes de continuarmos, gostaríamos de coletar algumas informações
            para aprimorar sua experiência ao usar o aplicativo.
          </Text>

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                leftIcon="phone-portrait-outline"
                placeholder="DDD + Celular"
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
              <SelectButtons
                selectedUserType={selectedUserType}
                onChange={onChange}
              />
            )}
          />

          <View style={styles.termsContainer}>
            <View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text style={styles.termsButtonText}>Termos e condições</Text>
              </TouchableOpacity>
              <Text style={styles.termsLabel}>
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

          <TermsModal
            visible={isModalVisible}
            acceptTerms={acceptTerms}
            declineTerms={declineTerms}
          />

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
    // textTransform: 'uppercase',
    marginBottom: 8,
  },
  textLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary500,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  termsButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primary500,
  },
  termsLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.secondary500,
  },
})
