import { UserDTO } from '@dtos/userDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE } from './storageConfig'

export async function storageSaveUser(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageGetUser() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)
  const user: UserDTO = storage ? JSON.parse(storage) : {}
  return user
}

export async function storageRemoveUser() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
