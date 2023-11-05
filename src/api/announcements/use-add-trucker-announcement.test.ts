import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { renderHook, waitFor } from '@__tests__/utils/custom-render'
import { reactQueryWrapper } from '@__tests__/utils/react-query-wrapper'
import {
  CreateAnnouncementDTo,
  CreateTruckerAnnouncementDTO,
} from '@dtos/AnnouncementDTO'

import { api } from '../'
import {
  addTruckerAnnouncement,
  formatAnnouncement,
  useAddTruckerAnnouncement,
} from './use-add-trucker-announcement'

dayjs.extend(utc)

const announcement: CreateTruckerAnnouncementDTO = {
  originCity: 'City A',
  departureDate: dayjs('2023-11-01').toDate(),
  departureTime: dayjs('2023-11-01T08:00:00').toDate(),
  destinationCity: 'City B',
  arrivalDate: dayjs('2023-11-02').toDate(),
  arrivalTime: dayjs('2023-11-02T10:00:00').toDate(),
}
const formattedAnnouncement: CreateAnnouncementDTo = {
  originCity: 'City A',
  pickupOrDepartureDate: dayjs('2023-11-01T08:00:00').toDate(),
  destinationCity: 'City B',
  arrivalOrDeliveryDate: dayjs('2023-11-02T10:00:00').toDate(),
}

describe('api: useAddTruckerAnnouncement', () => {
  beforeEach(() => {
    jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve())
  })

  it('should format the announcement correctly', () => {
    const formattedAnnouncement = formatAnnouncement(announcement)
    expect(formattedAnnouncement).toEqual(formattedAnnouncement)
  })

  it('should use addTruckerAnnouncement function and call the API with the correct data', async () => {
    await addTruckerAnnouncement(announcement)
    expect(api.post).toHaveBeenCalledWith(
      '/announcements',
      formattedAnnouncement,
    )
  })

  it('should use the useAddTruckerAnnouncement hook and call the API with the correct data', async () => {
    const { result } = renderHook(() => useAddTruckerAnnouncement(), {
      wrapper: reactQueryWrapper(),
    })

    await waitFor(() => {
      result.current.mutate(announcement)
    })

    expect(api.post).toHaveBeenCalledWith(
      '/announcements',
      formattedAnnouncement,
    )
  })
})
