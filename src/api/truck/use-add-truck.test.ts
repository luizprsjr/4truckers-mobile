import { mockedCreateTruck } from '@__tests__/mocks/truck/mocked-create-truck'
import { mockedTruck } from '@__tests__/mocks/truck/mocked-truck'
import { renderHook, waitFor } from '@__tests__/utils/custom-render'

import { api } from '../'
import { addTruck, useAddTruck } from './use-add-truck'

describe('api: useAddTruck', () => {
  beforeEach(() => {
    const response = {
      data: {
        truck: mockedTruck,
      },
    }
    jest.spyOn(api, 'post').mockResolvedValue(response)
  })

  it('should use addTruck function and call the API with the correct data', async () => {
    await addTruck(mockedCreateTruck)
    expect(api.post).toHaveBeenCalledWith('/trucks', mockedCreateTruck)
  })

  it('should use the useAddTruck hook and call the API with the correct data', async () => {
    const { result } = renderHook(() => useAddTruck())

    await waitFor(() => {
      result.current.mutate(mockedCreateTruck)
      expect(api.post).toHaveBeenCalledWith('/trucks', mockedCreateTruck)
    })
  })

  it('should return the correct values', async () => {
    const response = await addTruck(mockedCreateTruck)
    expect(response).toEqual(mockedTruck)
  })
})
