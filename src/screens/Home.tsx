import { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'

import { AnnouncementCard } from '@components/AnnouncementCard'
import { Header } from '@components/Header'
import { AnnouncementDTO } from '@dtos/announcementDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export function Home() {
  const [announcements, setAnnouncements] = useState<AnnouncementDTO[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function fetchAnnouncements() {
    try {
      setIsRefreshing(true)
      const { data } = await api.get<AnnouncementDTO[]>('/announcements')
      setAnnouncements(data)
    } catch (error) {
      if (!(error instanceof AxiosError) && error instanceof AppError) {
        Alert.alert(error.message)
      }
    } finally {
      setIsRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAnnouncements()
    }, []),
  )

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard item={item} />}
        refreshing={isRefreshing}
        onRefresh={fetchAnnouncements}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 32,
          gap: 16,
        }}
      />
    </View>
  )
}
