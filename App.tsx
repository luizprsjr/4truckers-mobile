import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { KronaOne_400Regular } from '@expo-google-fonts/krona-one'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    KronaOne_400Regular,
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
      }}
    >
      <StatusBar style="light" backgroundColor="#0C1033" />
      {fontsLoaded ? <Text>Hello World!</Text> : <View />}
    </View>
  )
}
