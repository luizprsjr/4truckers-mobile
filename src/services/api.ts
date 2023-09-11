import axios, { AxiosInstance } from 'axios'

import { storageGetRefreshToken } from '@storage/storageRefreshToken'
import { AppError } from '@utils/AppError'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.29.32:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message.includes('Authorization token')
        ) {
          const refreshToken = await storageGetRefreshToken()
          if (!refreshToken) {
            signOut()
            return Promise.reject(requestError)
          }
        }

        signOut()
      }

      if (requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(new AppError('Internal Server Error.'))
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
