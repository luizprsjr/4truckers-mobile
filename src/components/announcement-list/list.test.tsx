import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'

import { AnnouncementList } from './list'

const announcements: AnnouncementDTO[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'FREIGHT',
    originCity: 'City 1',
    pickupOrDepartureDate: new Date(),
    pickUpMaxDate: new Date(),
    destinationCity: 'City 2',
    arrivalOrDeliveryDate: new Date(),
    deliveryMaxDate: new Date(),
    weight: 1000,
    length: 500,
    width: 200,
    height: 250,
    canStack: true,
    description: 'Announcement description 1',
    createdAt: '2023-11-05T10:00:00Z',
    user: {
      id: 'user1',
      name: 'User 1',
      email: 'user1@example.com',
      phoneNumber: '+1 123-456-7890',
      type: 'TRUCKER',
      truck: {
        id: 'truck1',
        userId: 'user1',
        truckModel: 'Truck Model 1',
        capacity: 5000,
        length: 600,
        width: 250,
        height: 300,
      },
      avatarUrl: 'https://example.com/avatar.png',
    },
  },
  {
    id: '2',
    userId: 'user2',
    type: 'FREIGHT',
    originCity: 'City 3',
    pickupOrDepartureDate: new Date(),
    pickUpMaxDate: new Date(),
    destinationCity: 'City 4',
    arrivalOrDeliveryDate: new Date(),
    deliveryMaxDate: new Date(),
    weight: 2000,
    length: 600,
    width: 300,
    height: 350,
    canStack: false,
    description: 'Announcement description 2',
    createdAt: '2023-11-06T11:00:00Z',
    user: {
      id: 'user2',
      name: 'User 2',
      email: 'user2@example.com',
      phoneNumber: '+1 987-654-3210',
      type: 'USER',
      truck: null,
      avatarUrl: 'https://example.com/avatar2.png',
    },
  },
  {
    id: '3',
    userId: 'user3',
    type: 'FREE_DRIVER',
    originCity: 'City 5',
    pickupOrDepartureDate: new Date(),
    pickUpMaxDate: new Date(),
    destinationCity: 'City 6',
    arrivalOrDeliveryDate: new Date(),
    deliveryMaxDate: new Date(),
    weight: 1500,
    length: 700,
    width: 400,
    height: 450,
    canStack: true,
    description: 'Announcement description 3',
    createdAt: '2023-11-07T12:00:00Z',
    user: {
      id: 'user3',
      name: 'User 3',
      email: 'user3@example.com',
      phoneNumber: '+1 555-123-4567',
      type: 'TRUCKER',
      truck: {
        id: 'truck3',
        userId: 'user3',
        truckModel: 'Truck Model 3',
        capacity: 7000,
        length: 800,
        width: 450,
        height: 500,
      },
      avatarUrl: 'https://example.com/avatar3.png',
    },
  },
]

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}))

describe('component: AnnouncementList', () => {
  it('should render a list of TruckerCard and FreightCard components', () => {
    render(
      <AnnouncementList
        data={announcements}
        isRefreshing={false}
        onRefresh={jest.fn}
      />,
    )
    const allAnnouncementCards = screen.queryAllByTestId(
      /trucker-card|freight-card/,
    )
    expect(allAnnouncementCards).toHaveLength(3)
  })

  it('should call the onRefresh function when refreshing', async () => {
    const onRefresh = jest.fn()

    const { getByTestId } = render(
      <AnnouncementList
        data={announcements}
        isRefreshing={false}
        onRefresh={onRefresh}
      />,
    )

    const flatList = getByTestId('list')
    fireEvent(flatList, 'refresh')

    await waitFor(() => {
      expect(onRefresh).toHaveBeenCalled()
    })
  })

  it('should render EmptyList component when the data is empty', () => {
    const { getByText } = render(
      <AnnouncementList data={[]} isRefreshing={false} onRefresh={jest.fn} />,
    )

    expect(getByText(/não há anúncios ativos no momento/i)).toBeTruthy()
  })
})
