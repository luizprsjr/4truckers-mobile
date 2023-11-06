import { mockedAnnouncementList } from '@__tests__/__mocks__/announcements/mocked-announcement-list'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/custom-render'

import { AnnouncementList } from './list'

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
        data={mockedAnnouncementList}
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
        data={mockedAnnouncementList}
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
