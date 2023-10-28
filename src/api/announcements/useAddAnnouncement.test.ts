import { renderHook, waitFor } from '@__tests__/utils/custom-render'
import { reactQueryWrapper } from '@__tests__/utils/react-query-wrapper'
import { CreateAnnouncementDTo } from '@dtos/announcementDTO'

import { api } from '../'
import { addAnnouncements, useAddAnnouncements } from './useAddAnnouncement'

const announcement: CreateAnnouncementDTo = {
  id: '1',
  userId: 'user123',
  type: 'FREE_DRIVER',
  originCity: 'Cidade de Origem',
  originDate: new Date('2023-11-01'),
  originEndDate: new Date('2023-11-05'),
  destinationCity: 'Cidade de Destino',
  destinationDate: new Date('2023-11-06'),
  destinationEndDate: new Date('2023-11-10'),
  weight: 50.5,
  length: 100,
  width: 50,
  height: 30,
  canStack: true,
  description: 'Descrição do anúncio',
  createdAt: '2023-10-28T08:00:00',
  user: {
    id: 'user123',
    name: 'Nome do Usuário',
    email: 'usuario@example.com',
    phoneNumber: '123-456-7890',
    type: 'USER',
    truck: {
      id: 'truck123',
      userId: 'user123',
      truckModel: 'Modelo do Caminhão',
      capacity: 5000,
      length: 700,
      width: 250,
      height: 350,
    },
    avatarUrl: 'https://example.com/avatar.jpg',
  },
}

describe('api: useAddAnnouncements', () => {
  it('should call addAnnouncements function with the correct arguments', async () => {
    jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve())
    const result = await addAnnouncements(announcement)
    expect(api.post).toHaveBeenCalledWith('/announcements', announcement)
    expect(result).toEqual(undefined)
  })

  it('should use the useAddAnnouncements hook and call the mutate function with the correct arguments', async () => {
    jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve())

    const { result } = renderHook(() => useAddAnnouncements(), {
      wrapper: reactQueryWrapper(),
    })

    await waitFor(() => {
      result.current.mutate(announcement)
      expect(api.post).toHaveBeenCalledWith('/announcements', announcement)
      expect(result.current.data).toEqual(undefined)
    })
  })
})
