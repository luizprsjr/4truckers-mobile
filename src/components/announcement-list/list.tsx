import { FlatList } from 'react-native'

import { FreightCard, TruckerCard } from '@components/announcement-card'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'

import { EmptyList } from './empty-list'

export type AnnouncementListProps = {
  data: AnnouncementDTO[]
  isRefreshing: boolean
  onRefresh: () => void
}

export function AnnouncementList({
  data,
  isRefreshing,
  onRefresh,
}: AnnouncementListProps) {
  function renderItem({ item }: { item: AnnouncementDTO }) {
    if (item.user.type === 'TRUCKER') {
      return <TruckerCard item={item} />
    } else {
      return <FreightCard item={item} />
    }
  }

  return (
    <FlatList
      testID="list"
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyList />}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 32,
        gap: 16,
      }}
    />
  )
}
