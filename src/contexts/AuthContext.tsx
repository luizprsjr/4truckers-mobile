import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserDTO } from '@dtos/userDTO'
import { api } from '@services/api'
import {
  storageGetAuthToken,
  storageRemoveAuthToken,
  storageSaveAuthToken,
} from '@storage/storageAuthToken'
import {
  storageGetUser,
  storageRemoveUser,
  storageSaveUser,
} from '@storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
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

  function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true)
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token) {
        await storageSaveUser(data.user)
        await storageSaveAuthToken(data.token)
        updateUserAndToken(data.user, data.token)
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
      const loggedUser = await storageGetUser()
      if (token && loggedUser) {
        updateUserAndToken(loggedUser, token)
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

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
