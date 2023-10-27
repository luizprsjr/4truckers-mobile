import { AnnouncementDTO } from '@dtos/announcementDTO'
import { useQuery } from '@tanstack/react-query'

import { api } from '../'

export async function fetchAnnouncements(): Promise<AnnouncementDTO[]> {
  const { data } = await api.get<AnnouncementDTO[]>('/announcements')
  return data
}

export function useAnnouncements() {
  return useQuery({
    queryKey: ['get-announcements'],
    queryFn: fetchAnnouncements,
  })
}
