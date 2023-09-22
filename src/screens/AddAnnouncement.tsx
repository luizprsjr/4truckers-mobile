import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { z } from 'zod'

import { BlankSpacer } from '@components/BlackSpacer'
import { Button } from '@components/Button'
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
import { formatDateString } from '@utils/formatDateString'
import { isValidDate } from '@utils/isValidDate'
import { parseDateString } from '@utils/parseDateString'

const addAnnouncementSchema = z.object({
  originCity: z.string(),
  destinationCity: z.string(),

  originDate: z.string().refine(isValidDate, {
    message: 'Informe uma data válida (DD/MM/AAAA).',
  }),

  originEndDate: z.string().optional().refine(isValidDate, {
    message: 'Informe uma data válida (DD/MM/AAAA).',
  }),

  weight: z.number().min(1, 'Por favor, informe o peso do objeto.'),
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),

  description: z.string().optional(),
})

type AddAnnouncementsFormData = z.infer<typeof addAnnouncementSchema>

export function AddAnnouncement() {
  const [canStack, setCanStack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AppNavigationRoutesProps>()
  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
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
        originDate: parseDateString(announcement?.originDate),
        originEndDate: announcement.originEndDate
          ? parseDateString(announcement?.originEndDate)
          : undefined,
        canStack,
      }
      await api.post('/announcements', add)
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
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Data inicial da janela de coleta"
                    keyboardType="numeric"
                    placeholder="____/____/____"
                    onChangeText={(text) => {
                      const formattedText = formatDateString(text)
                      onChange(formattedText)
                    }}
                    value={value}
                    errorMessage={errors.originDate?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="originEndDate"
                render={({ field: { onChange, value } }) => (
                  <InputInfo
                    label="Data limite de coleta (opcional)"
                    keyboardType="numeric"
                    placeholder="____/____/____"
                    onChangeText={(text) => {
                      const formattedText = formatDateString(text)
                      onChange(formattedText)
                    }}
                    value={value}
                    errorMessage={errors.originEndDate?.message}
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

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    style={{
                      width: '100%',
                      minHeight: 100,
                      paddingVertical: 12,
                      color: colors.secondary400,
                    }}
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
})
