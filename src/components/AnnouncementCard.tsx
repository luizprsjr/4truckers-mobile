import dayjs from 'dayjs'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import avatar from '@assets/avatar.png'
import { AnnouncementDTO } from '@dtos/announcementDTO'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { colors, fonts } from '@theme/index'

type Props = {
  item: AnnouncementDTO
}

export function AnnouncementCard({ item }: Props) {
  const { user } = useAuth()
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  function handleOpenAd() {
    if (item.user.type === 'TRUCKER') {
      navigate('truckerAd', { id: item.id })
    } else {
      navigate('userAd', { id: item.id })
    }
  }

  return (
    <View style={styles.container}>
      {item.user.type === 'TRUCKER' && (
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 14,
            color: colors.primary700,
            marginBottom: 16,
          }}
        >
          {dayjs(item.originDate).format('DD/MM/YYYY')}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 24,
                width: 24,
                borderRadius: 12,
                backgroundColor: colors.primary0,
              }}
            >
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: colors.primary500,
                }}
              />
            </View>
            <View
              style={{
                height: 24,
                width: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="ellipsis-vertical-outline"
                size={16}
                color={colors.primary700}
              />
            </View>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={colors.primary500}
            />
          </View>
          <View style={{ gap: 16, flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 14,
                  color: colors.secondary700,
                }}
              >
                {item.originCity}
              </Text>
              {item.user.type === 'TRUCKER' && (
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 14,
                    color: colors.secondary700,
                  }}
                >
                  {dayjs(item.originDate).format('HH:mm')}
                </Text>
              )}
              {item.user.type === 'USER' && item.weight && (
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 14,
                    color: colors.primary700,
                  }}
                >
                  {item.weight}Kg
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 14,
                  color: colors.secondary300,
                }}
              >
                {item.destinationCity}
              </Text>
              {item.destinationDate &&
                item.originDate &&
                item.user.type === 'TRUCKER' && (
                  <Text
                    style={{
                      fontFamily: fonts.bold,
                      fontSize: 14,
                      color: colors.secondary300,
                    }}
                  >
                    {new Date(item.originDate).getDate() ===
                    new Date(item.destinationDate).getDate()
                      ? dayjs(item.destinationDate).format('HH:mm')
                      : dayjs(item.destinationDate).format('DD/MM [às] HH:mm')}
                  </Text>
                )}
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 1,
          borderWidth: 0.25,
          borderColor: colors.black,
          opacity: 0.25,
          marginVertical: 16,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {item.user.type === 'USER' ? (
          <View>
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 14,
                color: colors.secondary700,
              }}
            >
              Data de coleta
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 14,
                color: colors.secondary300,
              }}
            >
              {dayjs(item.originDate).format('DD/MM')}{' '}
              {item.originEndDate &&
                `a ${dayjs(item.originEndDate).format('DD/MM')}`}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={
                item.user.avatarUrl ? { uri: item.user.avatarUrl } : avatar
              }
              alt="avatar"
              style={{
                height: 48,
                width: 48,
                borderRadius: 999,
                marginRight: 4,
              }}
            />
            <View>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 14,
                  color: colors.secondary700,
                }}
              >
                {item.user.name}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 14,
                  color: colors.secondary300,
                }}
              >
                Motorista
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={{
            paddingVertical: 4,
            paddingHorizontal: 16,
            borderRadius: 99,
            backgroundColor: colors.primary500,
          }}
          onPress={handleOpenAd}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 14,
              color: colors.white,
            }}
          >
            ver mais
          </Text>
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
})
