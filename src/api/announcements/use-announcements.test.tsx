import { renderHook, waitFor } from '@__tests__/utils/custom-render'
import { reactQueryWrapper } from '@__tests__/utils/react-query-wrapper'
import { AnnouncementDTO } from '@dtos/announcementDTO'

import { api } from '../'
import { fetchAnnouncements, useAnnouncements } from './use-announcements'

const announcements: AnnouncementDTO[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'FREIGHT',
    originCity: 'Origem 1',
    destinationCity: 'Destino 1',
    weight: 1000,
    length: 200,
    width: 150,
    height: 100,
    description: 'Anúncio 1',
    createdAt: '2023-10-27',
    user: {
      id: 'user1',
      name: 'Usuário 1',
      email: 'usuario1@example.com',
      phoneNumber: '123-456-7890',
      type: 'USER',
      truck: null,
      avatarUrl: 'url1',
    },
  },
  {
    id: '2',
    userId: 'user2',
    type: 'FREIGHT',
    originCity: 'Origem 2',
    destinationCity: 'Destino 2',
    weight: 800,
    length: 180,
    width: 140,
    height: 90,
    description: 'Anúncio 2',
    createdAt: '2023-10-28',
    user: {
      id: 'user2',
      name: 'Usuário 2',
      email: 'usuario2@example.com',
      phoneNumber: '987-654-3210',
      type: 'USER',
      truck: null,
      avatarUrl: 'url2',
    },
  },
  {
    id: '3',
    userId: 'user3',
    type: 'FREE_DRIVER',
    originCity: 'Origem 3',
    destinationCity: 'Destino 3',
    description: 'Anúncio 3',
    createdAt: '2023-10-29',
    user: {
      id: 'user3',
      name: 'Usuário 3',
      email: 'usuario3@example.com',
      phoneNumber: '555-123-4567',
      type: 'TRUCKER',
      truck: {
        id: 'truck1',
        userId: 'user3',
        truckModel: 'Modelo 1',
        capacity: 5000,
        length: 300,
        width: 200,
        height: 150,
      },
      avatarUrl: 'url3',
    },
  },
]

describe('api: useAnnouncements', () => {
  it('should fetch announcements using API', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: announcements })
    const response = await fetchAnnouncements()
    expect(response).toHaveLength(3)
  })

  it('should use useAnnouncements hook to fetch and cache announcements', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: announcements })

    const { result } = renderHook(() => useAnnouncements(), {
      wrapper: reactQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(3)
  })
})
