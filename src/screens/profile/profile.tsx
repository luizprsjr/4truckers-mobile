import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import avatar from '@assets/avatar.png'
import { FormScreen } from '@components/form-screen'
import { Header } from '@components/header'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'
import { colors, fonts } from '@theme/index'

import { EditUserForm } from './components/edit-user-form'

export function Profile() {
  const { user, signOut } = useAuth()

  function handleWithSignOut() {
    signOut()
  }

  return (
    <FormScreen>
      <TouchableOpacity
        testID="logout-button"
        style={styles.logoutButton}
        onPress={handleWithSignOut}
      >
        <Ionicons name="exit-outline" size={32} color="white" />
      </TouchableOpacity>

      <Header />

      <View style={styles.topWrapper}>
        <View style={styles.avatar}>
          <Image
            testID="avatar-image"
            source={user.avatarUrl ? { uri: user.avatarUrl } : avatar}
            alt="avatar"
            style={styles.avatarImage}
          />
        </View>

        <Text style={styles.username}>{user.name}</Text>

        {user.truck && user.truck.truckModel && (
          <Text testID="truck-name" style={styles.truckModel}>
            {user.truck.truckModel}
          </Text>
        )}
      </View>

      <EditUserForm />
    </FormScreen>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    zIndex: 1,
    position: 'absolute',
    top: 32,
    right: 32,
  },
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary950,
    paddingBottom: 16,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 999,
  },
  username: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.white,
    marginTop: 8,
  },
  truckModel: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
})
