import { TruckDTO } from './truckDTO'

export type UserDTO = {
  id: string
  name: string
  email: string
  phoneNUmber: number
  type: 'USER' | 'TRUCKER'
  truck: TruckDTO | null
}
