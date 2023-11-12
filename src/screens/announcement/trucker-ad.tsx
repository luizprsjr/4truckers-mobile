import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import avatar from '@assets/avatar.png'
import { Header } from '@components/header'
import { WhatsAppLogo } from '@components/wpp-logo'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors, fonts } from '@theme/index'

type TruckerAdProps = {
  announcement: AnnouncementDTO
}

export function TruckerAd({ announcement }: TruckerAdProps) {
  function handleOpenWpp(phoneNumber: string) {
    const deepLink = `whatsapp://send?phone=${phoneNumber}`
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

  return (
    <View style={{ flex: 1 }}>
      <Header hasBackButton />

      <View style={styles.topWrapper}>
        <Image
          source={
            announcement.user?.avatarUrl
              ? { uri: announcement.user.avatarUrl }
              : avatar
          }
          alt="avatar"
          style={styles.profileImg}
        />

        <Text style={styles.truckerName}>{announcement.user?.name}</Text>
        <Text style={styles.truckModel}>
          {announcement.user?.truck?.truckModel}
        </Text>

        <View style={styles.infoWrapper}>
          <View style={styles.itemWrapper}>
            <Text style={styles.infoText}>
              {announcement.user?.truck?.capacity} Kg
            </Text>
            <Text style={styles.infoLabel}>Capacidade</Text>
          </View>

          {/* <View style={styles.itemWrapper}>
            <Text style={styles.infoText}>
              4.5 <Ionicons name="star" size={16} color={colors.white} />
            </Text>
            <Text style={styles.infoLabel}>Nota</Text>
          </View> */}

          <TouchableOpacity
            style={styles.itemWrapper}
            onPress={() => handleOpenWpp(announcement.user.phoneNumber)}
          >
            <WhatsAppLogo />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsTitle}>Detalhes do caminhão</Text>

          <View style={styles.truckDetailsWrapper}>
            <MaterialCommunityIcons
              name="truck-fast"
              size={24}
              color={colors.primary500}
            />
            <Text style={styles.truckDetailsLabel}>Modelo:</Text>

            <Text style={styles.truckDetailsText}>
              {announcement.user?.truck?.truckModel}
            </Text>
          </View>

          <View style={styles.truckDetailsWrapper}>
            <MaterialCommunityIcons
              name="weight-kilogram"
              size={24}
              color={colors.primary500}
            />
            <Text style={styles.truckDetailsLabel}>Capacidade:</Text>

            <Text style={styles.truckDetailsText}>
              {announcement.user?.truck?.capacity} Kg
            </Text>
          </View>

          <View style={styles.truckDetailsWrapper}>
            <MaterialCommunityIcons
              name="ruler"
              size={24}
              color={colors.primary500}
            />

            <Text style={styles.truckDetailsLabel}>Comprimento:</Text>

            <Text style={styles.truckDetailsText}>
              {announcement.user?.truck?.length} cm
            </Text>
          </View>

          <View style={styles.truckDetailsWrapper}>
            <MaterialCommunityIcons
              name="arrow-up-down"
              size={24}
              color={colors.primary500}
            />

            <Text style={styles.truckDetailsLabel}>Altura:</Text>

            <Text style={styles.truckDetailsText}>
              {announcement.user?.truck?.height} cm
            </Text>
          </View>

          <View style={styles.truckDetailsWrapper}>
            <MaterialCommunityIcons
              name="arrow-left-right"
              size={24}
              color={colors.primary500}
            />

            <Text style={styles.truckDetailsLabel}>Largura:</Text>

            <Text style={styles.truckDetailsText}>
              {announcement.user?.truck?.width} cm
            </Text>
          </View>
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
  },
  profileImg: {
    height: 120,
    width: 120,
    borderRadius: 999,
    marginBottom: 4,
  },
  truckerName: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.white,
  },
  truckModel: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  infoText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
  infoLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.white,
  },
  detailsWrapper: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    padding: 32,
    gap: 16,
  },
  detailsTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary700,
  },
  truckDetailsWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  truckDetailsLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary500,
  },
  truckDetailsText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary500,
  },
})
