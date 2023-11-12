import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { api } from '@api/index'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { TruckerAd } from '@screens/announcement/trucker-ad'
import { UserAd } from '@screens/announcement/user-ad'

interface RouteParamsProps {
  id: string
}

export function Announcement() {
  const [announcement, setAnnouncement] = useState<AnnouncementDTO>(
    {} as AnnouncementDTO,
  )
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  async function getAd() {
    try {
      const { data } = await api.get<AnnouncementDTO>(`/announcements/${id}`)
      setAnnouncement(data)
    } catch (error) {
      Alert.alert('Erro ao carregar o anúncio', 'Tente novamente mais tarde.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAd()
    }, [id]),
  )

  if (announcement.type === 'FREIGHT') {
    return <UserAd announcement={announcement} />
  }

  if (announcement.type === 'FREE_DRIVER') {
    return <TruckerAd announcement={announcement} />
  }
}
