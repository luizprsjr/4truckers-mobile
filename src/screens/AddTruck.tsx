import { AxiosError } from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { BlankSpacer } from '@components/BlankSpacer'
import { Button } from '@components/button'
import { Header } from '@components/Header'
import { InputInfo } from '@components/InputInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { colors, fonts } from '@theme/index'

const addTruckFormSchema = z.object({
  truckModel: z.string().min(2, 'O modelo deve ter pelo menos 2 caracteres.'),
  capacity: z.number().min(1, 'Por favor, informe a capacidade do caminhão.'),
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

type AddTruckFormData = z.infer<typeof addTruckFormSchema>

export function AddTruck() {
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useNavigation<AppNavigationRoutesProps>()
  const { user, updateUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTruckFormData>({
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

          <Controller
            control={control}
            name="truckModel"
            render={({ field: { onChange, value } }) => (
              <InputInfo
                label="Modelo do caminhão"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.truckModel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="capacity"
            render={({ field: { onChange, value } }) => (
              <InputInfo
                label="Capacidade"
                keyboardType="numeric"
                measurementUnit="Kg"
                onChangeText={(text) => {
                  const formattedText = Number(text)
                  onChange(formattedText)
                }}
                value={value ? String(value) : ''}
                errorMessage={errors.capacity?.message}
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
