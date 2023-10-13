import { View } from 'react-native'

import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { colors } from '@theme/index'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.secondary50

  if (isLoadingUserStorageData) return <Loading />

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary50 }}>
      <NavigationContainer>
        {user.id && user.phoneNumber ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}
