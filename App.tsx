import '@utils/dayjs'

import { StatusBar } from 'expo-status-bar'
import { ComponentType } from 'react'
import { View } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import { APIProvider } from '@api/provider'
import { Loading } from '@components/loading'
import { AuthContextProvider } from '@contexts/auth'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { KronaOne_400Regular } from '@expo-google-fonts/krona-one'
import { Routes } from '@routes/index'
import { colors } from '@theme/index'

interface TextProps {
  maxFontSizeMultiplier?: number
}

interface TextInputProps extends TextProps {
  allowFontScaling?: boolean
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    KronaOne_400Regular,
  })

  const Text: ComponentType<TextProps> = () => null
  const TextInput: ComponentType<TextInputProps> = () => null

  if (Text.defaultProps === null) {
    Text.defaultProps = {}
    Text.defaultProps.maxFontSizeMultiplier = 1.75
  }

  if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {}
    TextInput.defaultProps.maxFontSizeMultiplier = 1.75
  }

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
            <APIProvider>
              <AuthContextProvider>
                {fontsLoaded ? <Routes /> : <Loading />}
              </AuthContextProvider>
              <FlashMessage position="top" />
            </APIProvider>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  )
}
