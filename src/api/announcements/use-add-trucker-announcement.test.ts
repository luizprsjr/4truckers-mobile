import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { mockedCreateTruckerAnnouncement } from '@__tests__/__mocks__/announcements/mocked-create-trucker-announceement'
import { mockedFormattedAnnouncement } from '@__tests__/__mocks__/announcements/mocked-formated-tucker-announcement'
import { renderHook, waitFor } from '@__tests__/utils/custom-render'

import { api } from '../'
import {
  addTruckerAnnouncement,
  formatAnnouncement,
  useAddTruckerAnnouncement,
} from './use-add-trucker-announcement'

dayjs.extend(utc)

describe('api: useAddTruckerAnnouncement', () => {
  beforeEach(() => {
    jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve())
  })

  it('should format the announcement correctly', () => {
    const formattedAnnouncement = formatAnnouncement(
      mockedCreateTruckerAnnouncement,
    )
    expect(formattedAnnouncement).toEqual(mockedFormattedAnnouncement)
  })

  it('should use addTruckerAnnouncement function and call the API with the correct data', async () => {
    await addTruckerAnnouncement(mockedCreateTruckerAnnouncement)
    expect(api.post).toHaveBeenCalledWith(
      '/announcements',
      mockedFormattedAnnouncement,
    )
  })

  it('should use the useAddTruckerAnnouncement hook and call the API with the correct data', async () => {
    const { result } = renderHook(() => useAddTruckerAnnouncement())

    await waitFor(() => {
      result.current.mutate(mockedCreateTruckerAnnouncement)
    })

    expect(api.post).toHaveBeenCalledWith(
      '/announcements',
      mockedFormattedAnnouncement,
    )
  })
})
