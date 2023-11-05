import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { z } from 'zod'

import { useAddUserAnnouncement } from '@api/announcements/use-add-user-announcement'
import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { ControlledDatePicker } from '@components/date-picker/controlled-date-picker'
import { Header } from '@components/header'
import { ControlledInputInfo } from '@components/input-info/controlled-input-info'
import { ControlledSwitch } from '@components/switch/controlled-switch'
import { CreateUserAnnouncementDTO } from '@dtos/announcementDTO'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'
import { isSecondDateInFuture } from '@utils/validators/zod/isSecondDateInFuture'

const schema = z
  .object({
    originCity: z
      .string({ required_error: 'Campo obrigatório.' })
      .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
    pickupOrDepartureDate: z
      .date({ required_error: 'Campo obrigatório.' })
      .min(new Date(), 'Você não pode escolher uma data no passado.'),
    pickUpMaxDate: z
      .date({ required_error: 'Campo obrigatório.' })
      .min(new Date(), 'Você não pode escolher uma data no passado.')
      .optional(),
    destinationCity: z
      .string({ required_error: 'Campo obrigatório.' })
      .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
    deliveryMaxDate: z
      .date()
      .min(new Date(), 'Você não pode escolher uma data no passado.')
      .optional(),
    weight: z
      .string({ required_error: 'Campo obrigatório.' })
      .transform(Number),
    length: z.string().transform(Number).optional(),
    width: z.string().transform(Number).optional(),
    height: z.string().transform(Number).optional(),
    canStack: z.boolean().default(false),
    description: z
      .string()
      .max(250, 'A descrição deve ter no máximo 250 caracteres.')
      .optional(),
  })
  .refine(
    (data) =>
      isSecondDateInFuture(data.pickupOrDepartureDate, data.pickUpMaxDate),
    {
      message: 'Você não pode escolher uma data anterior à coleta',
      path: ['pickUpMaxDate'],
    },
  )
  .refine(
    (data) =>
      isSecondDateInFuture(data.pickupOrDepartureDate, data.deliveryMaxDate),
    {
      message: 'Você não pode escolher uma data anterior à coleta',
      path: ['deliveryMaxDate'],
    },
  )

export type FormType = z.infer<typeof schema>

export function UserForm() {
  const { handleSubmit, control, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
  })
  const { navigate } = useNavigation<AppNavigationRoutesProps>()
  const { mutate, isPending } = useAddUserAnnouncement()

  function onSubmit(data: CreateUserAnnouncementDTO) {
    mutate(data, {
      onSuccess: () => {
        reset()
        navigate('home')
        showMessage({
          message: 'Anúncio criado com sucesso',
          type: 'success',
        })
      },
      onError: () => {
        showMessage({
          message: 'Erro ao criar anúncio',
          type: 'danger',
          duration: 4000,
        })
      },
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Registrar carga</Text>

          <Text style={styles.subtitle}>Coleta</Text>

          <ControlledInputInfo
            control={control}
            name="originCity"
            label="Cidade de coleta"
          />

          <ControlledDatePicker
            control={control}
            name="pickupOrDepartureDate"
            label="Data inicial da janela de coleta"
            placeholder="____/____/____"
          />

          <ControlledDatePicker
            control={control}
            name="pickUpMaxDate"
            label="Data limite para coleta (opcional)"
            placeholder="____/____/____"
          />

          <Text style={styles.subtitle}>Entrega</Text>

          <ControlledInputInfo
            control={control}
            name="destinationCity"
            label="Cidade de entrega"
          />

          <ControlledDatePicker
            control={control}
            name="deliveryMaxDate"
            label="Prazo máximo para entrega (opcional)"
            placeholder="____/____/____"
          />

          <Text style={styles.subtitle}>Informações da carga</Text>

          <ControlledInputInfo
            control={control}
            name="weight"
            label="Peso"
            measurementUnit="Kg"
            keyboardType="numeric"
          />

          <ControlledInputInfo
            control={control}
            name="length"
            label="Cumprimento (opcional)"
            measurementUnit="cm"
            keyboardType="numeric"
          />

          <ControlledInputInfo
            control={control}
            name="width"
            label="Largura (opcional)"
            measurementUnit="cm"
            keyboardType="numeric"
          />

          <ControlledInputInfo
            control={control}
            name="height"
            label="Altura (opcional)"
            measurementUnit="cm"
            keyboardType="numeric"
          />

          <ControlledSwitch
            control={control}
            name="canStack"
            label="Pode empilhar?"
          />

          <ControlledInputInfo
            control={control}
            name="description"
            label="O que você está transportando? (opcional)"
            multiline
            textAlignVertical="top"
            numberOfLines={4}
          />

          <BlankSpacer height={12} />
          <Button
            title="Cadastrar"
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
            disabled={isPending}
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
})
