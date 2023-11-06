import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { api } from '@api/index'
import { BlankSpacer } from '@components/blank-spacer'
import { Button } from '@components/button'
import { Header } from '@components/header'
import { ControlledInputInfo } from '@components/input-info'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'

const addTruckFormSchema = z.object({
  truckModel: z.string().min(2, 'O modelo deve ter pelo menos 2 caracteres.'),
  capacity: z
    .string({ required_error: 'Campo obrigatório.' })
    .transform(Number),
  length: z.string().transform(Number).optional(),
  width: z.string().transform(Number).optional(),
  height: z.string().transform(Number).optional(),
})

type AddTruckFormData = z.infer<typeof addTruckFormSchema>

export function AddTruck() {
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useNavigation<AppNavigationRoutesProps>()
  const { user, updateUser } = useAuth()

  const { control, handleSubmit } = useForm<AddTruckFormData>({
    resolver: zodResolver(addTruckFormSchema),
  })

  async function handleAddNewTruck({
    truckModel,
    capacity,
    length,
    width,
    height,
  }: AddTruckFormData) {
    try {
      setIsLoading(true)
      const updatedUser = user
      const { data } = await api.post('/trucks', {
        truckModel,
        capacity,
        length,
        width,
        height,
      })
      updatedUser.truck = data.truck
      await updateUser(updatedUser)
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'addAnnouncement' }],
        }),
      )
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.form}>
          <Text style={styles.title}>ADICIONAR DADOS DO CAMINHÃO</Text>

          <ControlledInputInfo
            control={control}
            name="truckModel"
            label="Modelo do caminhão"
          />

          <ControlledInputInfo
            control={control}
            name="capacity"
            label="Capacidade"
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

          <BlankSpacer height={12} />
          <Button
            title="Salvar"
            onPress={handleSubmit(handleAddNewTruck)}
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
})
