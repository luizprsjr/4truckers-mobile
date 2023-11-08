import { UserDTO } from '@dtos/UserDTO'

export const mockedTruckerWithoutTruck: UserDTO = {
  id: '1',
  name: 'user-1',
  email: 'any-email@mail.com',
  phoneNumber: '999999999',
  type: 'TRUCKER',
  truck: null,
  avatarUrl: 'any-avatar',
}
