import { mockedTruckerWithTruck } from '@__tests__/mocks/user/mocked-trucker-with-truck'
import { renderHook, waitFor } from '@__tests__/utils/custom-render'

import { api } from '../'
import { saveUser, useSaveUser } from './save-user'

const formData = {
  name: 'new-name',
  phoneNumber: '888888888',
  truckModel: 'new-model',
  capacity: '888',
  length: '888',
  width: '888',
  height: '888',
}
const formattedFormData = {
  name: 'new-name',
  phoneNumber: '888888888',
  truckModel: 'new-model',
  capacity: 888,
  length: 888,
  width: 888,
  height: 888,
}

const user = mockedTruckerWithTruck
const updatedTruck = {
  ...user.truck,
  truckModel: 'new-model',
  capacity: 888,
  length: 888,
  width: 888,
  height: 888,
}
const updatedUser = {
  ...user,
  name: 'new-name',
  phoneNumber: '888888888',
  truck: updatedTruck,
}

describe('api: useSaveUser', () => {
  beforeEach(() => {
    const response = {
      data: {
        user: updatedUser,
      },
    }
    jest.spyOn(api, 'put').mockResolvedValue(response)
  })

  it('should use saveUser function and call the API with the correct data', async () => {
    await saveUser({ formData, user })
    expect(api.put).toHaveBeenCalledWith('/users', formattedFormData)
  })

  it('should use the useSaveUser hook and call the API with the correct data', async () => {
    const { result } = renderHook(() => useSaveUser())

    await waitFor(() => {
      result.current.mutate({ formData, user })
      expect(api.put).toHaveBeenCalledWith('/users', formattedFormData)
    })
  })

  it('should return the correct values', async () => {
    const response = await saveUser({ formData, user })
    expect(response).toEqual(updatedUser)
  })
})
