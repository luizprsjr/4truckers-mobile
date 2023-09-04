import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import { Loading } from '@components/Loading'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { KronaOne_400Regular } from '@expo-google-fonts/krona-one'
import { colors } from '@theme/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    KronaOne_400Regular,
  })

  return (
    <SafeAreaProvider>
      <StatusBar style="light" translucent />

      {/* only use if statusbar backgroundColor doesn't change, because iOS doesn't change the background color of the StatusBar */}
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View
            style={{
              flex: 1,
              paddingTop: insets?.top,
              backgroundColor: colors.primary950,
            }}
          >
            {fontsLoaded ? <Text>Hello World!</Text> : <Loading />}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  )
}
