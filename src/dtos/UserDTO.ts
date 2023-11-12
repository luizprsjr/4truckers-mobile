import { TruckDTO } from './TruckDTO'

export type UserDTO = {
  id: string
  name: string
  email: string
  phoneNumber: string
  type: 'USER' | 'TRUCKER'
  truck: TruckDTO | null
  avatarUrl?: string
}

export type UpdateUserDTO = {
  name?: string | undefined
  phoneNumber?: string | undefined
  truckModel?: string | undefined
  capacity?: string | undefined
  length?: string | undefined
  width?: string | undefined
  height?: string | undefined
}
