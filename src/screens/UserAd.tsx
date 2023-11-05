import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { api } from '@api/index'
import { Header } from '@components/header'
import { WhatsAppLogo } from '@components/wpp-logo'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { colors, fonts } from '@theme/index'

interface RouteParamsProps {
  id: string
}

export function UserAd() {
  const [announcement, setAnnouncement] = useState<AnnouncementDTO>(
    {} as AnnouncementDTO,
  )

  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  async function getAd() {
    try {
      const { data } = await api.get<AnnouncementDTO>(`/announcements/${id}`)
      setAnnouncement(data)
    } catch (error) {
      Alert.alert('Erro ao carregar o anúncio', 'Tente novamente mais tarde.')
    }
  }

  function handleOpenWpp(phoneNumber: string) {
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

  useFocusEffect(
    useCallback(() => {
      getAd()
    }, [id]),
  )

  return (
    <View style={{ flex: 1 }}>
      <Header hasBackButton />

      <TouchableOpacity
        style={styles.wppButton}
        onPress={() => handleOpenWpp(announcement.user.phoneNumber)}
      >
        <WhatsAppLogo height={44} width={44} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Detalhes da carga</Text>
          <Text style={styles.subTitle}>Coleta</Text>

          <View style={styles.itemWrapper}>
            <View style={styles.circleContainer}>
              <View style={styles.circle} />
            </View>

            <Text style={styles.text}>{announcement.originCity}</Text>
          </View>

          <View style={styles.itemWrapper}>
            <Feather name="calendar" size={32} color={colors.primary500} />

            <Text style={styles.text}>
              {dayjs(announcement.pickupOrDepartureDate).format('DD/MM')}{' '}
              {announcement.pickUpMaxDate &&
                `a ${dayjs(announcement.pickUpMaxDate).format('DD/MM')}`}
            </Text>
          </View>

          <Text style={styles.subTitle}>Entrega</Text>

          <View style={styles.itemWrapper}>
            <MaterialCommunityIcons
              name="map-marker"
              size={32}
              color={colors.primary500}
            />
            <Text style={styles.text}>{announcement.destinationCity}</Text>
          </View>

          {announcement.deliveryMaxDate && (
            <View style={styles.itemWrapper}>
              <Feather name="calendar" size={32} color={colors.primary500} />
              <Text style={styles.text}>{`até ${dayjs(
                announcement.deliveryMaxDate,
              ).format('DD/MM')}`}</Text>
            </View>
          )}

          <Text style={styles.subTitle}>Detalhes da carga</Text>

          <View style={styles.itemWrapper}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={24}
                color={colors.primary500}
              />
            </View>
            <Text style={styles.label}>Peso:</Text>

            <Text style={styles.text}>
              {announcement.weight
                ? `${announcement.weight} Kg`
                : 'não informado'}
            </Text>
          </View>

          <View style={styles.itemWrapper}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="ruler"
                size={24}
                color={colors.primary500}
              />
            </View>
            <Text style={styles.label}>Comprimento:</Text>

            <Text style={styles.text}>
              {announcement.length
                ? `${announcement.length} cm`
                : 'não informado'}
            </Text>
          </View>

          <View style={styles.itemWrapper}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="arrow-up-down"
                size={24}
                color={colors.primary500}
              />
            </View>
            <Text style={styles.label}>Altura:</Text>

            <Text style={styles.text}>
              {announcement.height
                ? `${announcement.height} cm`
                : 'não informado'}
            </Text>
          </View>

          <View style={styles.itemWrapper}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="arrow-left-right"
                size={24}
                color={colors.primary500}
              />
            </View>
            <Text style={styles.label}>Largura:</Text>

            <Text style={styles.text}>
              {announcement.width
                ? `${announcement.width} cm`
                : 'não informado'}
            </Text>
          </View>

          <View style={styles.itemWrapper}>
            <View style={styles.iconWrapper}>
              <Octicons name="stack" size={24} color={colors.primary500} />
            </View>
            <Text style={styles.label}>Empilhável:</Text>

            <Text style={styles.text}>
              {announcement.canStack ? 'sim' : 'não'}
            </Text>
          </View>

          {announcement.description && (
            <View style={{ gap: 4 }}>
              <View style={styles.itemWrapper}>
                <View style={styles.iconWrapper}>
                  <AntDesign
                    name="filetext1"
                    size={24}
                    color={colors.primary500}
                  />
                </View>
                <Text style={styles.label}>Detalhes adicionais:</Text>
              </View>

              <Text style={[styles.text, { maxWidth: '80%', fontSize: 14 }]}>
                {announcement.description}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 32,
    backgroundColor: colors.white,
    gap: 16,
  },
  wppButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.primary700,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary500,
    marginTop: 16,
  },
  itemWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    borderRadius: 999,
    backgroundColor: colors.primary0,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 999,
    backgroundColor: colors.primary500,
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary600,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary500,
  },
  iconWrapper: {
    height: 24,
    width: 24,
  },
})
