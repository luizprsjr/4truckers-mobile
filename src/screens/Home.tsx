import { Text, View } from 'react-native'

import { useAnnouncements } from '@api/announcements/use-announcements'
import { AnnouncementList } from '@components/announcement-list'
import { Header } from '@components/Header'

export function Home() {
  const { data, isLoading, isError, refetch } = useAnnouncements()

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {isError && <Text>Ocorreu um erro ao carregar a lista</Text>}

      <AnnouncementList
        data={data || []}
        isRefreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  )
}
