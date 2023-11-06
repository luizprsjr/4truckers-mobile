import { mockedAnnouncement } from '@__tests__/__mocks__/announcements/mocked-announcement'
import { fireEvent, render, screen } from '@__tests__/utils/custom-render'

import { TruckerCard } from './trucker-card'

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
    render(<TruckerCard item={mockedAnnouncement} />)

    expect(screen.getByText(/City 1/i)).toBeOnTheScreen()
    expect(screen.getByText(/City 2/i)).toBeOnTheScreen()
    expect(screen.getByText(/User 1/i)).toBeOnTheScreen()
    expect(screen.getByTestId('avatar')).toBeOnTheScreen()
  })

  it('should call the handleOpenAd function when clicking button', () => {
    const { getByText } = render(<TruckerCard item={mockedAnnouncement} />)

    const button = getByText('ver mais')
    fireEvent.press(button)

    expect(mockedGoBack).toHaveBeenCalled()
  })
})
