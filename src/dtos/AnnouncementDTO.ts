import { UserDTO } from './UserDTO'

export type AnnouncementType = 'FREIGHT' | 'FREE_DRIVER'

export type AnnouncementDTO = {
  id: string
  userId: string
  type?: AnnouncementType
  originCity?: string
  pickupOrDepartureDate?: Date
  pickUpMaxDate?: Date
  destinationCity?: string
  arrivalOrDeliveryDate?: Date
  deliveryMaxDate?: Date
  weight?: number
  length?: number
  width?: number
  height?: number
  canStack?: boolean
  description?: string
  createdAt?: string
  user: UserDTO
}

export type CreateAnnouncementDTo = {
  id?: string
  userId?: string
  type?: AnnouncementType
  originCity?: string
  pickupOrDepartureDate?: Date
  pickUpMaxDate?: Date
  destinationCity?: string
  arrivalOrDeliveryDate?: Date
  deliveryMaxDate?: Date
  weight?: number
  length?: number
  width?: number
  height?: number
  canStack?: boolean
  description?: string
  createdAt?: string
  user?: UserDTO
}

export interface CreateTruckerAnnouncementDTO {
  originCity: string
  departureDate: Date
  departureTime?: Date
  destinationCity: string
  arrivalDate?: Date
  arrivalTime?: Date
}

export interface CreateUserAnnouncementDTO {
  originCity: string
  pickupOrDepartureDate: Date
  pickUpMaxDate?: Date
  destinationCity: string
  deliveryMaxDate?: Date
  weight: number
  length?: number
  width?: number
  height?: number
  canStack: boolean
  description?: string
}
