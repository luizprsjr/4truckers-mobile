import dayjs from 'dayjs'

import {
  CreateAnnouncementDTo,
  CreateTruckerAnnouncementDTO,
} from '@dtos/AnnouncementDTO'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../'

export function formatAnnouncement(data: CreateTruckerAnnouncementDTO) {
  const announcement: CreateAnnouncementDTo = {
    originCity: data.originCity,
    pickupOrDepartureDate: dayjs(data.departureDate).toDate(),
    destinationCity: data.destinationCity,
  }

  if (data.arrivalDate && data.arrivalTime) {
    const arrivalDateTime = dayjs(data.arrivalDate)
      .hour(data.arrivalTime.getHours())
      .minute(data.arrivalTime.getMinutes())
    announcement.arrivalOrDeliveryDate = arrivalDateTime.toDate()
  }

  if (data.departureTime) {
    const departureDateTime = dayjs(data.departureDate)
      .hour(data.departureTime.getHours())
      .minute(data.departureTime.getMinutes())
    announcement.pickupOrDepartureDate = departureDateTime.toDate()
  }

  return announcement
}

export async function addTruckerAnnouncement(
  data: CreateTruckerAnnouncementDTO,
): Promise<void> {
  const announcement = formatAnnouncement(data)

  await api.post<void>('/announcements', announcement)
}

export function useAddTruckerAnnouncement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addTruckerAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-announcements'] })
    },
  })
}
