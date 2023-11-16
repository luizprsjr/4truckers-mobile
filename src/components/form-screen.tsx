import { KeyboardAvoidingView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type FormScreenProps = {
  children: React.ReactNode
  isStack?: boolean
}

export function FormScreen({ children, isStack = false }: FormScreenProps) {
  const { bottom } = useSafeAreaInsets()
  const iOSBehavior = isStack ? 'padding' : 'height'

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? iOSBehavior : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? bottom + 12 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
