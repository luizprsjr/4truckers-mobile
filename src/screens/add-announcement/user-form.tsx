import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { z } from 'zod'

import { useAddUserAnnouncement } from '@api/announcements/use-add-user-announcement'
import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { ControlledDatePicker } from '@components/date-picker'
import { Header } from '@components/header'
import { ControlledInputInfo } from '@components/input-info'
import { ControlledSwitch } from '@components/switch'
import { CreateUserAnnouncementDTO } from '@dtos/AnnouncementDTO'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'
import { isNumber } from '@utils/isNumber'
import { isSecondDateInFuture } from '@utils/validators/zod/isSecondDateInFuture'

const schema = z
  .object({
    originCity: z
      .string({ required_error: 'Informe a cidade de coleta.' })
      .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
    pickupOrDepartureDate: z
      .date({ required_error: 'Informe a data de coleta.' })
      .min(new Date(), 'Você não pode escolher uma data no passado.'),
    pickUpMaxDate: z
      .date({ required_error: 'Campo obrigatório.' })
      .min(new Date(), 'Você não pode escolher uma data no passado.')
      .optional(),
    destinationCity: z
      .string({ required_error: 'Informe a cidade de entrega.' })
      .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
    deliveryMaxDate: z
      .date()
      .min(new Date(), 'Você não pode escolher uma data no passado.')
      .optional(),
    weight: z
      .string({ required_error: 'Informe o peso.' })
      .refine(isNumber, { message: 'Deve ser um número.' })
      .transform(Number),
    length: z
      .string()
      .refine(isNumber, { message: 'Deve ser um número.' })
      .transform(Number)
      .optional(),
    width: z
      .string()
      .refine(isNumber, { message: 'Deve ser um número.' })
      .transform(Number)
      .optional(),
    height: z
      .string()
      .refine(isNumber, { message: 'Deve ser um número.' })
      .transform(Number)
      .optional(),
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

export type UserFormType = z.infer<typeof schema>

export function UserForm() {
  const { handleSubmit, control, reset } = useForm<UserFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
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
            testID="origin-city"
            control={control}
            name="originCity"
            label="Cidade de coleta"
          />

          <ControlledDatePicker
            testID="pick-up-date"
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
            testID="destination-city"
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
            testID="weight"
            control={control}
            name="weight"
            label="Peso"
            measurementUnit="Kg"
            keyboardType="numeric"
          />

          <ControlledInputInfo
            control={control}
            name="length"
            label="Comprimento (opcional)"
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
            scrollEnabled={false}
          />

          <BlankSpacer height={12} />
          <Button
            testID="submit-button"
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
