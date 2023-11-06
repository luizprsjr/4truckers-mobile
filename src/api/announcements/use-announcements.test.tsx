import { mockedAnnouncementList } from '@__tests__/__mocks__/announcements/mocked-announcement-list'
import { renderHook, waitFor } from '@__tests__/utils/custom-render'
import { reactQueryWrapper } from '@__tests__/utils/react-query-wrapper'

import { api } from '../'
import { fetchAnnouncements, useAnnouncements } from './use-announcements'

describe('api: useAnnouncements', () => {
  it('should fetch announcements using API', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockedAnnouncementList })
    const response = await fetchAnnouncements()
    expect(response).toHaveLength(3)
  })

  it('should use useAnnouncements hook to fetch and cache announcements', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockedAnnouncementList })

    const { result } = renderHook(() => useAnnouncements(), {
      wrapper: reactQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(3)
  })
})
