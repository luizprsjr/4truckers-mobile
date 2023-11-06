import { renderHook, waitFor } from '@__tests__/utils/custom-render'
import { reactQueryWrapper } from '@__tests__/utils/react-query-wrapper'
import { CreateUserAnnouncementDTO } from '@dtos/AnnouncementDTO'

import { api } from '../'
import {
  addUserAnnouncement,
  useAddUserAnnouncement,
} from './use-add-user-announcement'

const userAnnouncement: CreateUserAnnouncementDTO = {
  originCity: 'City X',
  pickupOrDepartureDate: new Date(),
  destinationCity: 'City Y',
  weight: 500,
  canStack: true,
  description: 'Sample description',
}

describe('api: useAddUserAnnouncement', () => {
  beforeEach(() => {
    jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve())
  })

  it('should use addUserAnnouncement function and call the API with the correct data', async () => {
    await addUserAnnouncement(userAnnouncement)
    expect(api.post).toHaveBeenCalledWith('/announcements', userAnnouncement)
  })

  it('should use the useAddUserAnnouncement hook and call the API with the correct data', async () => {
    const { result } = renderHook(() => useAddUserAnnouncement(), {
      wrapper: reactQueryWrapper(),
    })

    await waitFor(() => {
      result.current.mutate(userAnnouncement)
    })

    expect(api.post).toHaveBeenCalledWith('/announcements', userAnnouncement)
  })
})
