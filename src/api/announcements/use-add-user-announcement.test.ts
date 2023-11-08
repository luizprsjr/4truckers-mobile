import { mockedCreateUserAnnouncement } from '@__tests__/__mocks__/announcements/mocked-create-user-announcement'
import { renderHook, waitFor } from '@__tests__/utils/custom-render'

import { api } from '../'
import {
  addUserAnnouncement,
  useAddUserAnnouncement,
} from './use-add-user-announcement'

describe('api: useAddUserAnnouncement', () => {
  beforeEach(() => {
    jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve())
  })

  it('should use addUserAnnouncement function and call the API with the correct data', async () => {
    await addUserAnnouncement(mockedCreateUserAnnouncement)
    expect(api.post).toHaveBeenCalledWith(
      '/announcements',
      mockedCreateUserAnnouncement,
    )
  })

  it('should use the useAddUserAnnouncement hook and call the API with the correct data', async () => {
    const { result } = renderHook(() => useAddUserAnnouncement())

    await waitFor(() => {
      result.current.mutate(mockedCreateUserAnnouncement)
    })

    expect(api.post).toHaveBeenCalledWith(
      '/announcements',
      mockedCreateUserAnnouncement,
    )
  })
})
