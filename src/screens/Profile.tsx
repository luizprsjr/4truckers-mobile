import { useEffect } from 'react'
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import avatar from '@assets/avatar.png'
import WhatsApp from '@assets/wpp.svg'
import { BlankSpacer } from '@components/BlackSpacer'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { InputInfo } from '@components/InputInfo'
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { colors, fonts } from '@theme/index'

export function Profile() {
  const { navigate } = useNavigation()
  const { signOut, user } = useAuth()

  const handleOpenWpp = (phoneNumber: string) => {
    // Replace '1234567890' with the recipient's phone number including the country code

    // Create the WhatsApp deep link
    const deepLink = `whatsapp://send?phone=${phoneNumber}`

    // Try to open the WhatsApp deep link
    Linking.canOpenURL(deepLink)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(deepLink)
        } else {
          console.error('WhatsApp is not installed on this device.')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleWithSignOut() {
    signOut()
  }

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ zIndex: 1, position: 'absolute', top: 32, right: 32 }}
        onPress={handleWithSignOut}
      >
        <Ionicons name="exit-outline" size={32} color="white" />
      </TouchableOpacity>

      <Header />

      <View style={styles.topWrapper}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={user.avatarUrl ? { uri: user.avatarUrl } : avatar}
            alt="avatar"
            style={{ height: 120, width: 120, borderRadius: 999 }}
          />
        </View>

        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 24,
            color: colors.white,
            marginTop: 8,
          }}
        >
          {user.name}
        </Text>

        {user.truck && (
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: 16,
              color: colors.white,
            }}
          >
            {user.truck.truckModel}
          </Text>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.form}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 16,
              color: colors.primary700,
            }}
          >
            Informações pessoais
          </Text>
          <InputInfo label="Nome" placeholder={user.name} />
          <InputInfo label="E-mail" placeholder={user.email} editable={false} />
          <InputInfo label="Celular" placeholder={user.phoneNumber} />

          {user.truck && (
            <>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  color: colors.primary700,
                  marginTop: 16,
                }}
              >
                Informações do caminhão
              </Text>

              <InputInfo label="Modelo" placeholder={user.truck.truckModel} />
              <InputInfo
                label="Capacidade"
                placeholder={String(user.truck.capacity)}
                measurementUnit="Kg"
              />

              <InputInfo
                label="Comprimento"
                placeholder={String(user.truck.length)}
                measurementUnit="cm"
              />
              <InputInfo
                label="Largura"
                placeholder={String(user.truck.width)}
                measurementUnit="cm"
              />
              <InputInfo
                label="Altura"
                placeholder={String(user.truck.height)}
                measurementUnit="cm"
              />
            </>
          )}
          <BlankSpacer height={4} />
          <Button
            title="Salvar"
            onPress={() => Alert.alert('Funcionalidade ainda não implementada')}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary950,
    paddingBottom: 16,
  },
  form: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 32,
    gap: 16,
  },
})
