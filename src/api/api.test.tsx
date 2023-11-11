import { AxiosInterceptorManager } from 'axios'
import { Text } from 'react-native'

import { render, screen } from '@__tests__/utils/custom-render'

import { api } from './'
import { APIProvider } from './provider'

interface CustomInterceptorManager<V> extends AxiosInterceptorManager<V> {
  handlers: any[]
}

describe('api', () => {
  it('should reject 401 unauthorized', async () => {
    const signOut = jest.fn()
    api.registerInterceptTokenManager(signOut)

    const response401 = {
      status: 401,
      data: { message: 'Refresh Token Expired.' },
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    )
    const rejectedHandler = (
      api.interceptors.response as CustomInterceptorManager<any>
    ).handlers[interceptorId]?.rejected

    await expect(rejectedHandler(response401)).rejects.toMatchObject({
      status: 401,
      data: { message: 'Refresh Token Expired.' },
    })
  })

  it('should complete authorized', async () => {
    const signOut = jest.fn()
    api.registerInterceptTokenManager(signOut)

    const response200 = {
      status: 200,
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    )
    const fulfilledHandler = (
      api.interceptors.response as CustomInterceptorManager<any>
    ).handlers[interceptorId]?.fulfilled

    const successResponse = await fulfilledHandler(response200)
    expect(successResponse).toEqual(response200)
  })

  it('should render the children', () => {
    render(
      <APIProvider>
        <Text>children</Text>
      </APIProvider>,
    )

    expect(screen.getByText(/children/i)).toBeOnTheScreen()
  })
})
