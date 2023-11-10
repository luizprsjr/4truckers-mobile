import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { z } from 'zod'

import { useAddTruck } from '@api/truck/use-add-truck'
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
  truckModel: z.string({ required_error: 'Informe o modelo.' }),
  capacity: z
    .string({ required_error: 'Informe a capacidade.' })
    .transform(Number),
  length: z.string().transform(Number).optional(),
  width: z.string().transform(Number).optional(),
  height: z.string().transform(Number).optional(),
})

export type AddTruckFormData = z.infer<typeof addTruckFormSchema>

export function AddTruck() {
  const { dispatch } = useNavigation<AppNavigationRoutesProps>()
  const { user, updateUser } = useAuth()

  const { control, handleSubmit, reset } = useForm<AddTruckFormData>({
    resolver: zodResolver(addTruckFormSchema),
  })

  const { mutate, isPending } = useAddTruck()

  async function handleAddNewTruck(formData: AddTruckFormData) {
    mutate(formData, {
      onSuccess: async (data) => {
        reset()
        const updatedUser = user
        updatedUser.truck = data
        await updateUser(updatedUser)
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'addAnnouncement' }],
          }),
        )
        showMessage({
          message: 'Caminhão adicionado com sucesso',
          type: 'success',
        })
      },
      onError: () => {
        showMessage({
          message: 'Erro ao adicionar caminhão',
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
          <Text style={styles.title}>ADICIONAR DADOS DO CAMINHÃO</Text>

          <ControlledInputInfo
            testID="truck-model"
            control={control}
            name="truckModel"
            label="Modelo do caminhão"
          />

          <ControlledInputInfo
            testID="capacity"
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
            testID="submit-button"
            title="Salvar"
            onPress={handleSubmit(handleAddNewTruck)}
            isLoading={isPending}
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
