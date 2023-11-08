import { UserDTO } from '@dtos/UserDTO'

export const mockedTruckerWithTruck: UserDTO = {
  id: '1',
  name: 'user-1',
  email: 'any-email@mail.com',
  phoneNumber: '999999999',
  type: 'TRUCKER',
  truck: {
    id: '1',
    userId: '1',
    truckModel: 'any-truck-model',
    capacity: 10000,
    length: 3000,
    width: 1500,
    height: 2000,
  },
  avatarUrl: 'any-avatar',
}
