import dayjs from 'dayjs'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import avatar from '@assets/avatar.png'
import { AnnouncementDTO } from '@dtos/AnnouncementDTO'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'

type TruckerCardProps = {
  item: AnnouncementDTO
}

export function TruckerCard({ item }: TruckerCardProps) {
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  function handleOpenAd() {
    navigate('truckerAd', { id: item.id })
  }

  const departureDate = dayjs(item.pickupOrDepartureDate)
  const arrivalDate = dayjs(item.arrivalOrDeliveryDate)
  const isSameDay = departureDate.isSame(arrivalDate, 'day')

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {departureDate.format('DD/MM/YYYY')}
        {item.arrivalOrDeliveryDate &&
          !isSameDay &&
          ` - ${arrivalDate.format('DD/MM/YYYY')}`}
      </Text>

      <View style={styles.infoWrapper}>
        <View>
          <View style={styles.bigCircle}>
            <View style={styles.smallCircle} />
          </View>
          <View style={styles.pointerIconWrapper}>
            <View style={styles.dashedSeparator} />
          </View>

          <View style={styles.pointerIconWrapper}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={colors.primary500}
            />
          </View>
        </View>

        <View style={styles.citiesAndTimesWrapper}>
          <View style={styles.citiesAndTimesRow}>
            <Text style={styles.darkText}>{item.originCity}</Text>
            <Text style={styles.darkText}>
              {dayjs(item.pickupOrDepartureDate).format('HH:mm')}
            </Text>
          </View>

          <View style={styles.citiesAndTimesRow}>
            <Text style={styles.lightText}>{item.destinationCity}</Text>
            <Text style={styles.lightText}>
              {item.arrivalOrDeliveryDate
                ? dayjs(item.arrivalOrDeliveryDate).format('HH:mm')
                : null}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.bottomWrapper}>
        <View style={styles.userInfoWrapper}>
          <Image
            testID="avatar"
            source={item.user.avatarUrl ? { uri: item.user.avatarUrl } : avatar}
            style={styles.avatar}
            alt="avatar"
          />
          <View>
            <Text style={styles.darkText}>{item.user.name}</Text>
            <Text style={styles.lightText}>Motorista</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleOpenAd}>
          <Text style={styles.buttonText}>ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
  },
  date: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primary700,
    marginBottom: 16,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bigCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: colors.primary0,
  },
  smallCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.primary500,
  },
  pointerIconWrapper: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  citiesAndTimesWrapper: {
    gap: 16,
    flex: 1,
  },
  dashedSeparator: {
    height: 16,
    width: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary700,
  },
  citiesAndTimesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary700,
  },
  lightText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary300,
  },
  separator: {
    height: 1,
    borderWidth: 0.25,
    borderColor: colors.black,
    opacity: 0.25,
    marginVertical: 16,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 999,
    marginRight: 4,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 99,
    backgroundColor: colors.primary500,
  },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white,
  },
})
