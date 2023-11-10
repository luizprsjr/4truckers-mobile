import { CreateTruckDTO, TruckDTO } from '@dtos/TruckDTO'
import { useMutation } from '@tanstack/react-query'

import { api } from '../'

type Response = {
  truck: TruckDTO
}

export async function addTruck(formDate: CreateTruckDTO): Promise<TruckDTO> {
  const { data } = await api.post<Response>('/trucks', formDate)

  if (!data || !data.truck) {
    throw new Error('Invalid API response format')
  }

  return data.truck
}

export function useAddTruck() {
  return useMutation({
    mutationFn: addTruck,
  })
}
