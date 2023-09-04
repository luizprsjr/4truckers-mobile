import { View } from 'react-native'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { colors } from '@theme/index'

import { AuthRoutes } from './auth.routes'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = colors.secondary50

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary50 }}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  )
}
