import { Text, TouchableOpacity, View } from 'react-native'

import { Header } from '@components/Header'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'

export function AddAnnouncement() {
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  function handleButton() {
    navigate('announcement')
  }

  return (
    <View>
      <Header />
      <Text>AddAnnouncement</Text>
      <TouchableOpacity onPress={handleButton}>
        <Text>new announcement</Text>
      </TouchableOpacity>
    </View>
  )
}
