import { SafeAreaProvider } from 'react-native-safe-area-context'

import { APIProvider } from '@api/provider'
import { render, RenderOptions } from '@testing-library/react-native'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <APIProvider>{children}</APIProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
