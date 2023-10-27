import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react-native'

export const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react-native'
export { customRender as render, Providers }
