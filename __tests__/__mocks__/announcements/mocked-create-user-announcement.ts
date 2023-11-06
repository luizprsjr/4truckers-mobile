import { CreateUserAnnouncementDTO } from '@dtos/AnnouncementDTO'

export const mockedCreateUserAnnouncement: CreateUserAnnouncementDTO = {
  originCity: 'City X',
  pickupOrDepartureDate: new Date(),
  destinationCity: 'City Y',
  weight: 500,
  canStack: true,
  description: 'Sample description',
}
