import axios, { AxiosError, AxiosInstance } from 'axios'
import { Alert } from 'react-native'

import {
  storageGetRefreshToken,
  storageSaveRefreshToken,
} from '@storage/storageRefreshToken'
import { AppError } from '@utils/AppError'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'https://fourtruckers-api.onrender.com',
}) as APIInstanceProps

let failedQueue: PromiseType[] = []
let isRefreshing = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (requestError.response.data?.message === 'Refresh Token Expired.') {
          Alert.alert(
            'Sessão expirada',
            'Você ficou inativo por muito tempo e foi desconectado. Por favor, faça o login novamente.',
          )
          signOut()
        }
        if (
          requestError.response.data?.message.includes('Authorization token')
        ) {
          const refreshToken = await storageGetRefreshToken()
          if (!refreshToken) {
            signOut()
            return Promise.reject(requestError)
          }
          const originalRequestConfig = requestError.config
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }
          isRefreshing = true
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.patch('/token/refresh', {
                oldRefreshToken: refreshToken,
              })
              await storageSaveRefreshToken(data.refreshToken)
              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }
              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              }
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`
              failedQueue.forEach((request) => {
                request.onSuccess(data.token)
              })
              resolve(api(originalRequestConfig))
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error)
              })
              signOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
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
    if (typeof interceptTokenManager === 'number') return

    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
