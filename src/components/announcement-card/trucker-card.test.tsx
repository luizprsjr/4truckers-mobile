import { fireEvent, render, screen } from '@__tests__/utils/custom-render'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'

import { TruckerCard } from './trucker-card'

const announcement: AnnouncementDTO = {
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
  description: 'Descrição do anúncio',
  createdAt: '2023-11-05T10:00:00Z',
  user: {
    id: 'user1',
    name: 'User 1',
    email: 'usuario@example.com',
    phoneNumber: '+1 123-456-7890',
    type: 'TRUCKER',
    truck: {
      id: 'truck1',
      userId: 'user1',
      truckModel: 'Modelo do Caminhão',
      capacity: 5000,
      length: 600,
      width: 250,
      height: 300,
    },
    avatarUrl: 'https://example.com/avatar.png',
  },
}

const mockedGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedGoBack,
  }),
}))

describe('component: TruckerCard', () => {
  beforeEach(() => {
    mockedGoBack.mockClear()
  })

  it('should render correctly', () => {
    render(<TruckerCard item={announcement} />)

    expect(screen.getByText(/City 1/i)).toBeOnTheScreen()
    expect(screen.getByText(/City 2/i)).toBeOnTheScreen()
    expect(screen.getByText(/User 1/i)).toBeOnTheScreen()
    expect(screen.getByTestId('avatar')).toBeOnTheScreen()
  })

  it('should call the handleOpenAd function when clicking button', () => {
    const { getByText } = render(<TruckerCard item={announcement} />)

    const button = getByText('ver mais')
    fireEvent.press(button)

    expect(mockedGoBack).toHaveBeenCalled()
  })
})
