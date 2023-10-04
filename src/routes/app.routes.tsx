import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { AddAnnouncement } from '@screens/AddAnnouncement'
import { AddTruck } from '@screens/AddTruck'
import { Announcement } from '@screens/Announcement'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { TruckerAd } from '@screens/TruckerAd'
import { UserAd } from '@screens/UserAd'
import { colors, fonts } from '@theme/index'

type AppRoutes = {
  home: undefined
  addAnnouncement: undefined
  addTruck: undefined
  profile: undefined
  announcement: undefined
  truckerAd: {
    id: string
  }
  userAd: {
    id: string
  }
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { bottom } = useSafeAreaInsets()
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.secondary400,
        tabBarStyle: {
          backgroundColor: colors.primary950,
          height: Platform.OS === 'android' ? 72 : 96,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: Platform.OS === 'android' ? 12 : bottom,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarLabelStyle: { fontFamily: fonts.bold },
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

      <Screen
        name="truckerAd"
        component={TruckerAd}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="userAd"
        component={UserAd}
        options={{
          tabBarButton: () => null,
          // tabBarStyle: { display: 'none' },
        }}
      />
    </Navigator>
  )
}
