import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import * as z from 'zod'

import { useAddTruckerAnnouncement } from '@api/announcements/use-add-trucker-announcement'
import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { ControlledDatePicker } from '@components/date-picker/controlled-date-picker'
import { Header } from '@components/Header'
import { ControlledInputInfo } from '@components/input-info/controlled-input-info'
import { ControlledTimePicker } from '@components/time-picker/controlled-time-picker'
import { CreateTruckerAnnouncementDTO } from '@dtos/announcementDTO'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'
import { isFutureDate } from '@utils/validators/zod/isFutureDate'
import { isSecondDateInFuture } from '@utils/validators/zod/isSecondDateInFuture'
import { isTimeAheadByOneHour } from '@utils/validators/zod/isTimeAheadByOneHour'

const schema = z
  .object({
    originCity: z
      .string({ required_error: 'Campo obrigatório.' })
      .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
    departureDate: z
      .date({ required_error: 'Campo obrigatório.' })
      .min(new Date(), 'Você não pode escolher uma data no passado.'),
    departureTime: z.date({ required_error: 'Campo obrigatório.' }),
    destinationCity: z
      .string({ required_error: 'Campo obrigatório.' })
      .min(2, 'O nome da cidade deve ter pelo menos 2 caracteres.'),
    arrivalDate: z
      .date()
      .min(new Date(), 'Você não pode escolher uma data no passado.')
      .optional(),
    arrivalTime: z.date().optional(),
  })
  .refine((data) => isFutureDate(data, 'departureDate', 'departureTime'), {
    message: 'Você não pode escolher uma hora no passado',
    path: ['departureTime'],
  })
  .refine((data) => isFutureDate(data, 'arrivalDate', 'arrivalTime'), {
    message: 'Você não pode escolher uma hora no passado',
    path: ['arrivalTime'],
  })
  .refine((data) => !(!data.departureDate && data.departureTime), {
    message: 'Selecione uma data',
    path: ['departureDate'],
  })
  .refine((data) => !(!data.arrivalDate && data.arrivalTime), {
    message: 'Selecione uma data',
    path: ['arrivalDate'],
  })
  .refine(
    (data) => isSecondDateInFuture(data.departureDate, data.arrivalDate),
    {
      message: 'A data de chegada não pode ser anterior a data de partida',
      path: ['arrivalDate'],
    },
  )
  .refine(
    (data) =>
      isTimeAheadByOneHour(
        data.departureDate,
        data.departureTime,
        data.arrivalDate,
        data.arrivalTime,
      ),
    {
      message: 'O horário de chegada deve ser pelo menos 1 hora após a partida',
      path: ['arrivalTime'],
    },
  )

export type FormType = z.infer<typeof schema>

export function TruckerForm() {
  const { handleSubmit, control, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const { navigate } = useNavigation<AppNavigationRoutesProps>()
  const { mutate, isPending } = useAddTruckerAnnouncement()

  function onSubmit(data: CreateTruckerAnnouncementDTO) {
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
          <Text style={styles.title}>Registrar viagem</Text>

          <Text style={styles.subtitle}>Partida</Text>

          <ControlledInputInfo
            control={control}
            name="originCity"
            label="Cidade de partida"
          />

          <ControlledDatePicker
            control={control}
            name="departureDate"
            label="Data de partida"
            placeholder="____/____/____"
          />

          <ControlledTimePicker
            control={control}
            name="departureTime"
            label="Hora da partida"
            placeholder="00:00"
          />

          <Text style={styles.subtitle}>Destino</Text>

          <ControlledInputInfo
            control={control}
            name="destinationCity"
            label="Cidade de destino"
          />

          <ControlledDatePicker
            control={control}
            name="arrivalDate"
            label="Data de chegada"
            placeholder="____/____/____"
          />

          <ControlledTimePicker
            control={control}
            name="arrivalTime"
            label="Hora de chegada"
            placeholder="00:00"
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
