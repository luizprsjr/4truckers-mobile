import dayjs from 'dayjs'

import { CreateTruckerAnnouncementDTO } from '@dtos/AnnouncementDTO'

export const mockedCreateTruckerAnnouncement: CreateTruckerAnnouncementDTO = {
  originCity: 'City A',
  departureDate: dayjs('2023-11-01').toDate(),
  departureTime: dayjs('2023-11-01T08:00:00').toDate(),
  destinationCity: 'City B',
  arrivalDate: dayjs('2023-11-02').toDate(),
  arrivalTime: dayjs('2023-11-02T10:00:00').toDate(),
}
