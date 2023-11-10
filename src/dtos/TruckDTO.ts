export type TruckDTO = {
  id: string
  userId?: string
  truckModel: string
  capacity: number
  length?: number
  width?: number
  height?: number
}

export type CreateTruckDTO = {
  truckModel: string
  capacity: number
  length?: number | undefined
  width?: number | undefined
  height?: number | undefined
}
