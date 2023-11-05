import { CreateUserAnnouncementDTO } from '@dtos/AnnouncementDTO'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../'

export async function addUserAnnouncement(
  data: CreateUserAnnouncementDTO,
): Promise<void> {
  await api.post<void>('/announcements', data)
}

export function useAddUserAnnouncement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addUserAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-announcements'] })
    },
  })
}
