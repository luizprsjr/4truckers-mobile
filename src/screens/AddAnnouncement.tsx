import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { z } from 'zod'

import { BlankSpacer } from '@components/BlackSpacer'
import { Button } from '@components/Button'
import { DateTimeInput } from '@components/DateTimeInput'
import { Header } from '@components/Header'
import { InputInfo } from '@components/InputInfo'
import { SimpleButton } from '@components/SimpleButton'
import { AnnouncementDTO } from '@dtos/announcementDTO'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { colors, fonts } from '@theme/index'

const addAnnouncementSchema = z.object({
  originCity: z
    .string({ required_error: 'Campo obrigatório.' })
    .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
  originDate: z
    .date({ required_error: 'Campo obrigatório.' })
    .min(new Date(), 'Você não pode escolher uma data no passado.'),
  originEndDate: z
    .date()
    .optional()
    .refine(
      (date) => {
        if (date === undefined) return true
        return date >= new Date()
      },
      {
        message: 'Você não pode escolher uma data no passado.',
      },
    ),
  destinationCity: z
    .string({ required_error: 'Campo obrigatório.' })
    .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
  destinationDate: z
    .date()
    .optional()
    .refine(
      (date) => {
        if (date === undefined) return true
        return date >= new Date()
      },
      {
        message: 'Você não pode escolher uma data no passado.',
      },
    ),

  weight: z
    .number()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        return value >= 1
      },
      {
        message: 'O peso deve ter pelo menos 1kg.',
      },
    ),
  length: z
    .number()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        return value >= 1
      },
      {
        message: 'O item deve ter pelo menos 1 cm.',
      },
    ),
  width: z
    .number()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        return value >= 1
      },
      {
        message: 'O item deve ter pelo menos 1 cm.',
      },
    ),
  height: z
    .number()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        return value >= 1
      },
      {
        message: 'O item deve ter pelo menos 1 cm.',
      },
    ),

  description: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true

        return value.length <= 250
      },
      {
        message: 'A descrição deve ter no máximo 250 caracteres.',
      },
    ),
})

type AddAnnouncementsFormData = z.infer<typeof addAnnouncementSchema>

export function AddAnnouncement() {
  const [resetDateTimeInputs, setResetDateTimeInputs] = useState(false)

  const [canStack, setCanStack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AppNavigationRoutesProps>()
  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddAnnouncementsFormData>({
    resolver: zodResolver(addAnnouncementSchema),
  })

  function handleAddTruck() {
    navigate('addTruck')
  }

  async function handleAddNewAnnouncement(announcement: AnnouncementDTO) {
    try {
      setIsLoading(true)
      const add = {
        ...announcement,
        canStack,
      }
      await api.post('/announcements', add)
      reset()
      setResetDateTimeInputs(true)
      navigate('home')
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (user.type === 'TRUCKER' && !user.truck) {
    return (
      <>
        <Header />
        <View style={styles.noTruckContainer}>
          <Text style={styles.noTruckText}>
            Antes de criar um anúncio, é importante que você forneça algumas
            informações sobre o seu caminhão.
          </Text>

          <SimpleButton title="registrar caminhão" onPress={handleAddTruck} />
        </View>
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.form}>
          {user.type === 'USER' ? (
            <>
              <Text style={styles.title}>Registrar carga</Text>

              <Text style={styles.subtitle}>Locais de coleta e entrega</Text>
              <Controller
                control={control}
                name="originCity"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Cidade de coleta"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.originCity?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="destinationCity"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Cidade destino"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.destinationCity?.message}
                  />
                )}
              />

              <Text style={styles.subtitle}>Data de coleta</Text>
              <Controller
                control={control}
                name="originDate"
                render={({ field: { onChange } }) => (
                  <DateTimeInput
                    label="Melhor data e hora para a coleta"
                    withTimer
                    placeholder="____/____/____"
                    errorMessage={errors.originDate?.message}
                    onChange={(date) => onChange(date)}
                    reset={resetDateTimeInputs}
                  />
                )}
              />
              <Controller
                control={control}
                name="originEndDate"
                render={({ field: { onChange } }) => (
                  <DateTimeInput
                    label="Data limite de coleta (opcional)"
                    withTimer
                    placeholder="____/____/____"
                    errorMessage={errors.originEndDate?.message}
                    onChange={(date) => onChange(date)}
                    reset={resetDateTimeInputs}
                  />
                )}
              />

              <Text style={styles.subtitle}>Informações da carga</Text>
              <Controller
                control={control}
                name="weight"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Peso"
                    keyboardType="numeric"
                    measurementUnit="Kg"
                    onChangeText={(text) => {
                      const formattedText = Number(text)
                      onChange(formattedText)
                    }}
                    value={value ? String(value) : ''}
                    errorMessage={errors.weight?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="length"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Comprimento (opcional)"
                    keyboardType="numeric"
                    measurementUnit="cm"
                    onChangeText={(text) => {
                      const formattedText = Number(text)
                      onChange(formattedText)
                    }}
                    value={value ? String(value) : ''}
                    errorMessage={errors.length?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="width"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Largura (opcional)"
                    keyboardType="numeric"
                    measurementUnit="cm"
                    onChangeText={(text) => {
                      const formattedText = Number(text)
                      onChange(formattedText)
                    }}
                    value={value ? String(value) : ''}
                    errorMessage={errors.width?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="height"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Altura (opcional)"
                    keyboardType="numeric"
                    measurementUnit="cm"
                    onChangeText={(text) => {
                      const formattedText = Number(text)
                      onChange(formattedText)
                    }}
                    value={value ? String(value) : ''}
                    errorMessage={errors.height?.message}
                  />
                )}
              />

              <View style={styles.canStack}>
                <Text style={styles.label}>Pode empilhar?</Text>
                <Switch
                  trackColor={{
                    false: colors.secondary400,
                    true: colors.primary700,
                  }}
                  thumbColor={colors.secondary100}
                  ios_backgroundColor={colors.secondary300}
                  onValueChange={() => setCanStack((prev) => !prev)}
                  value={canStack}
                />
              </View>

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    textAlignVertical="top"
                    label="O que você está transportando? (opcional) "
                    placeholder="digite qualquer informação relevante..."
                    multiline
                    numberOfLines={4}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>Registrar viagem</Text>

              <Text style={styles.subtitle}>Locais de Datas</Text>

              <Controller
                control={control}
                name="originCity"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Cidade de partida"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.originCity?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="originDate"
                render={({ field: { onChange } }) => (
                  <DateTimeInput
                    label="Data e hora da partida"
                    withTimer
                    placeholder="____/____/____"
                    errorMessage={errors.originDate?.message}
                    onChange={(date) => onChange(date)}
                    reset={resetDateTimeInputs}
                  />
                )}
              />

              <Controller
                control={control}
                name="destinationCity"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Cidade de destino"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.destinationCity?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="destinationDate"
                render={({ field: { onChange } }) => (
                  <DateTimeInput
                    label="Data e hora de chegada (opcional)"
                    withTimer
                    placeholder="____/____/____"
                    errorMessage={errors.destinationDate?.message}
                    onChange={(date) => onChange(date)}
                    reset={resetDateTimeInputs}
                  />
                )}
              />
            </>
          )}

          <BlankSpacer height={12} />
          <Button
            title="Cadastrar"
            onPress={handleSubmit(handleAddNewAnnouncement)}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  noTruckContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  noTruckText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary700,
    marginBottom: 16,
    textAlign: 'center',
  },
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
    fontSize: 20,
    color: colors.secondary700,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary700,
    textAlign: 'left',
    marginTop: 16,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary400,
    textTransform: 'none',
  },
  canStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'ios' ? 4 : 0,
  },
})
