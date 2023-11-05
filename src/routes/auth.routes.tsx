import { Loading } from '@components/loading'
import { useAuth } from '@hooks/useAuth'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { AddUserInfo } from '@screens/AddUserInfo'
import { SignIn } from '@screens/SignIn'

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigationRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) return <Loading />

  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Screen name="signIn" component={user.id ? AddUserInfo : SignIn} />
      {/* <Screen name="signUp" component={SignUp} /> */}
    </Navigator>
  )
}
