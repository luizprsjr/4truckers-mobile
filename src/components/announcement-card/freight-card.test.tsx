import { mockedAnnouncement } from '@__tests__/__mocks__/announcements/mocked-announcement'
import { fireEvent, render, screen } from '@__tests__/utils/custom-render'

import { FreightCard } from './freight-card'

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}))

describe('component: FreightCard', () => {
  beforeEach(() => {
    mockedNavigate.mockClear()
  })

  it('should render correctly', () => {
    render(<FreightCard item={mockedAnnouncement} />)

    expect(screen.getByText(/City 1/i)).toBeOnTheScreen()
    expect(screen.getByText(/City 2/i)).toBeOnTheScreen()
    expect(screen.getByText(/1000/i)).toBeOnTheScreen()
  })

  it('should call the handleOpenAd function when clicking button', () => {
    const { getByText } = render(<FreightCard item={mockedAnnouncement} />)

    const button = getByText('ver mais')
    fireEvent.press(button)

    expect(mockedNavigate).toHaveBeenCalled()
  })
})
