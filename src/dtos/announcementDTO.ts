import { UserDTO } from './userDTO'

export type AnnouncementType = 'FREIGHT' | 'FREE_DRIVER'

export type AnnouncementDTO = {
  id?: string
  userId?: string
  type?: AnnouncementType
  originCity?: string
  originDate?: Date
  originEndDate?: Date
  destinationCity?: string
  destinationDate?: Date
  weight?: number
  length?: number
  width?: number
  height?: number
  canStack?: boolean
  description?: string
  createdAt?: string
  user?: UserDTO
}
