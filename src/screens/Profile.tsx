import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { z } from 'zod'

import { api } from '@api/index'
import avatar from '@assets/avatar.png'
import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { Header } from '@components/header'
import { ControlledInputInfo } from '@components/input-info/controlled-input-info'
import { InputInfo } from '@components/input-info/input-info'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { colors, fonts } from '@theme/index'
import { AppError } from '@utils/AppError'
import { formatPhoneNumber } from '@utils/formatPhoneNumber'

const phoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/

const updateUserFormSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Número inválido. Informe o DDD + número.')
    .optional(),
  // type: z.enum(['USER', 'TRUCKER']).optional(),
  truckModel: z.string().optional(),
  capacity: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
})

type UpdateUserFormData = z.infer<typeof updateUserFormSchema>

export function Profile() {
  const { user, signOut, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    // watch,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserFormSchema),
  })
  // const selectedUserType = watch('type', user.type)

  async function handleSaveUser({
    name,
    phoneNumber,
    // type,
    truckModel,
    capacity,
    length,
    width,
    height,
  }: UpdateUserFormData) {
    try {
      setIsLoading(true)

      const { data, status } = await api.put('/users', {
        name: name || user.name,
        phoneNumber: phoneNumber
          ? phoneNumber.replace(/\D/g, '')
          : user.phoneNumber,
        // type: type || user.type,
        truckModel,
        capacity: capacity ? Number(capacity) : undefined,
        length: length ? Number(length) : undefined,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
      })

      if (status === 200) {
        await updateUser(data.user)
        Alert.alert('Perfil alterado com sucesso!')
      }
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'
      console.warn(message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleWithSignOut() {
    signOut()
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ zIndex: 1, position: 'absolute', top: 32, right: 32 }}
        onPress={handleWithSignOut}
      >
        <Ionicons name="exit-outline" size={32} color="white" />
      </TouchableOpacity>

      <Header />

      <View style={styles.topWrapper}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={user.avatarUrl ? { uri: user.avatarUrl } : avatar}
            alt="avatar"
            style={{ height: 120, width: 120, borderRadius: 999 }}
          />
        </View>

        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 24,
            color: colors.white,
            marginTop: 8,
          }}
        >
          {user.name}
        </Text>

        {user.truck && (
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: 16,
              color: colors.white,
            }}
          >
            {user.truck.truckModel}
          </Text>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.form}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 16,
              color: colors.primary700,
            }}
          >
            Informações pessoais
          </Text>

          <ControlledInputInfo
            control={control}
            name="name"
            label="Nome"
            placeholder={user.name}
          />

          <InputInfo label="E-mail" placeholder={user.email} editable={false} />

          <ControlledInputInfo
            control={control}
            name="phoneNumber"
            label="Celular"
            placeholder={user.name}
            keyboardType="number-pad"
            maskFunc={formatPhoneNumber}
          />

          {user.truck && (
            <>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  color: colors.primary700,
                  marginTop: 16,
                }}
              >
                Informações do caminhão
              </Text>

              <ControlledInputInfo
                control={control}
                name="truckModel"
                label="Modelo"
                placeholder={user.truck?.truckModel}
              />

              <ControlledInputInfo
                control={control}
                name="capacity"
                label="Capacidade"
                placeholder={
                  user.truck?.capacity
                    ? String(user.truck.capacity)
                    : '______________'
                }
                keyboardType="number-pad"
              />

              <ControlledInputInfo
                control={control}
                name="length"
                label="Comprimento"
                placeholder={
                  user.truck?.length
                    ? String(user.truck.length)
                    : '______________'
                }
                keyboardType="number-pad"
              />

              <ControlledInputInfo
                control={control}
                name="width"
                label="Largura"
                placeholder={
                  user.truck?.width
                    ? String(user.truck.width)
                    : '______________'
                }
                keyboardType="number-pad"
              />

              <ControlledInputInfo
                control={control}
                name="height"
                label="Altura"
                placeholder={
                  user.truck?.height
                    ? String(user.truck.height)
                    : '______________'
                }
                keyboardType="number-pad"
              />
            </>
          )}
          <BlankSpacer height={4} />
          <Button
            title="Salvar"
            onPress={handleSubmit(handleSaveUser)}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary950,
    paddingBottom: 16,
  },
  form: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 32,
    gap: 16,
  },
  textLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary500,
  },
})
