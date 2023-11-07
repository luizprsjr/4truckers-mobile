import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { APIProvider } from '@api/provider'
import { AuthContextProvider } from '@contexts/auth'
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react-native'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <APIProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </APIProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

const customRenderHook = <Props extends React.ComponentType>(
  callback: (props: Props) => any,
  options?: RenderHookOptions<Props>,
) => renderHook(callback, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'
export { customRender as render, customRenderHook as renderHook }
