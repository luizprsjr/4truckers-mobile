import { TruckDTO } from './truckDTO'

export type UserDTO = {
  id: string
  name: string
  email: string
  phoneNumber: string
  type: 'USER' | 'TRUCKER'
  truck: TruckDTO | null
  avatar?: string
}
