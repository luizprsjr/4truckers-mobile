import dayjs from 'dayjs'

import { CreateAnnouncementDTo } from '@dtos/AnnouncementDTO'

export const mockedFormattedAnnouncement: CreateAnnouncementDTo = {
  originCity: 'City A',
  pickupOrDepartureDate: dayjs('2023-11-01T08:00:00').toDate(),
  destinationCity: 'City B',
  arrivalOrDeliveryDate: dayjs('2023-11-02T10:00:00').toDate(),
}
