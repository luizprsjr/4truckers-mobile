import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { AddAnnouncement } from '@screens/add-announcement'
import { AddTruck } from '@screens/add-truck'
import { Announcement } from '@screens/announcement'
import { Home } from '@screens/home'
import { Profile } from '@screens/profile'
import { colors } from '@theme/index'

type AppRoutes = {
  home: undefined
  addAnnouncement: undefined
  addTruck: undefined
  profile: undefined
  announcement: {
    id: string
  }
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { bottom } = useSafeAreaInsets()
  const tabHeight = Platform.OS === 'android' ? 72 : 62
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.secondary400,
        tabBarStyle: {
          backgroundColor: colors.primary950,
          height: tabHeight + bottom,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: Math.max(bottom, 12),
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="addAnnouncement"
        component={AddAnnouncement}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={64}
              color={color}
              style={{ zIndex: 2, position: 'absolute' }}
            />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="announcement"
        component={Announcement}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="addTruck"
        component={AddTruck}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
