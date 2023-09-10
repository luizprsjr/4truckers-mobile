import AsyncStorage from '@react-native-async-storage/async-storage'

import { REFRESH_TOKEN_STORAGE } from './storageConfig'

export async function storageSaveRefreshToken(token: string) {
  await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE, token)
}

export async function storageGetRefreshToken() {
  const token = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE)

  return token
}

export async function storageRemoveRefreshToken() {
  await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE)
}
