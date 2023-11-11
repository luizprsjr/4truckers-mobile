import { useForm } from 'react-hook-form'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { z } from 'zod'

import { useSaveUser } from '@api/user/save-user'
import avatar from '@assets/avatar.png'
import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { Header } from '@components/header'
import { ControlledInputInfo, InputInfo } from '@components/input-info'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { colors, fonts } from '@theme/index'
import { formatPhoneNumber } from '@utils/formatPhoneNumber'

const phoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/

const updateUserFormSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Número inválido. Informe o DDD + número.')
    .optional(),
  truckModel: z.string().optional(),
  capacity: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
})

export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>

export function Profile() {
  const { user, signOut, updateUser } = useAuth()

  const { control, handleSubmit } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserFormSchema),
  })

  const { mutate, isPending } = useSaveUser()

  async function handleSaveUser(formData: UpdateUserFormData) {
    const newInfos = { formData, user }
    mutate(newInfos, {
      onSuccess: async (data) => {
        await updateUser(data)
        showMessage({
          message: 'Perfil alterado com sucesso.',
          type: 'success',
        })
      },
      onError: () => {
        showMessage({
          message: 'Erro ao editar perfil.',
          type: 'danger',
          duration: 4000,
        })
      },
    })
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
            placeholder={formatPhoneNumber(user.phoneNumber)}
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
            disabled={isPending}
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
