import { UpdateUserDTO, UserDTO } from '@dtos/UserDTO'
import { useMutation } from '@tanstack/react-query'

import { api } from '../'

type Response = {
  user: UserDTO
}

type Params = {
  formData: UpdateUserDTO
  user: UserDTO
}

export async function saveUser({ formData, user }: Params): Promise<UserDTO> {
  const newInfos = {
    name: formData.name || user.name,
    phoneNumber: formData.phoneNumber
      ? formData.phoneNumber.replace(/\D/g, '')
      : user.phoneNumber,
    truckModel: formData.truckModel
      ? formData.truckModel
      : user.truck
      ? user.truck.truckModel
      : undefined,
    capacity: formData.capacity ? Number(formData.capacity) : undefined,
    length: formData.length ? Number(formData.length) : undefined,
    width: formData.width ? Number(formData.width) : undefined,
    height: formData.height ? Number(formData.height) : undefined,
  }

  const { data } = await api.put<Response>('/users', newInfos)

  if (!data || !data.user) {
    throw new Error('Invalid API response format')
  }

  return data.user
}

export function useSaveUser() {
  return useMutation({
    mutationFn: saveUser,
  })
}
