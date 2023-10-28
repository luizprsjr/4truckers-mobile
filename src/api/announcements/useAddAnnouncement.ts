import { CreateAnnouncementDTo } from '@dtos/announcementDTO'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../'

export async function addAnnouncements(
  add: CreateAnnouncementDTo,
): Promise<void> {
  await api.post<void>('/announcements', add)
}

export function useAddAnnouncements() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addAnnouncements,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-announcements'] })
    },
  })
}
