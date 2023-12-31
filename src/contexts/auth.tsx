import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '@api/index'
import { UserDTO } from '@dtos/UserDTO'
import {
  storageGetAuthToken,
  storageRemoveAuthToken,
  storageSaveAuthToken,
} from '@storage/storage-auth-token'
import {
  storageGetRefreshToken,
  storageRemoveRefreshToken,
  storageSaveRefreshToken,
} from '@storage/storage-refresh-token'
import {
  storageGetUser,
  storageRemoveUser,
  storageSaveUser,
} from '@storage/stored-user'

export type AuthContextDataProps = {
  user: UserDTO
  updateUser: (userData: UserDTO) => void
  signIn: (email: string, password: string) => Promise<void>
  googleSignIn: (accessToken: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function updateUser(userData: UserDTO) {
    await storageSaveUser(userData)
    setUser(userData)
  }

  function updateUserAndTokens(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true)
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token && data.refreshToken) {
        await storageSaveUser(data.user)
        await storageSaveAuthToken(data.token)
        await storageSaveRefreshToken(data.refreshToken)
        updateUserAndTokens(data.user, data.token)
      }
    } catch (error) {
      if (error) throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function googleSignIn(accessToken: string) {
    try {
      setIsLoadingUserStorageData(true)
      const { data } = await api.post('/google-session', { accessToken })

      if (data.user && data.token && data.refreshToken) {
        await storageSaveUser(data.user)
        await storageSaveAuthToken(data.token)
        await storageSaveRefreshToken(data.refreshToken)
        updateUserAndTokens(data.user, data.token)
      }
    } catch (error) {
      if (error) throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageRemoveUser()
      await storageRemoveAuthToken()
      await storageRemoveRefreshToken()
    } catch (error) {
      if (error) throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)
      const token = await storageGetAuthToken()
      const refreshToken = await storageGetRefreshToken()
      const loggedUser = await storageGetUser()
      if (token && loggedUser && refreshToken) {
        updateUserAndTokens(loggedUser, token)
      }
    } catch (error) {
      if (error) throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        signIn,
        googleSignIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
