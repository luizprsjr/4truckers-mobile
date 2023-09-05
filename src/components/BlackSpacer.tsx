import { View } from 'react-native'

type Props = {
  height?: number
  width?: number
}

export function BlankSpacer({ height, width }: Props) {
  return <View style={{ height, width }} />
}
