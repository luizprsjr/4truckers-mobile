import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthContextProvider } from '@contexts/auth'
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react-native'

import { TestAPIProvider } from './react-query-wrapper'

const DefaultProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <TestAPIProvider>{children}</TestAPIProvider>
    </SafeAreaProvider>
  )
}

const ProviderWithAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <TestAPIProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </TestAPIProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: DefaultProviders, ...options })

const customRenderHook = <Props extends React.ComponentType>(
  callback: (props: Props) => any,
  options?: RenderHookOptions<Props>,
) => renderHook(callback, { wrapper: DefaultProviders, ...options })

const renderWithAuth = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: ProviderWithAuth, ...options })

const renderHookWithAuth = <Props extends React.ComponentType>(
  callback: (props: Props) => any,
  options?: RenderHookOptions<Props>,
) => renderHook(callback, { wrapper: ProviderWithAuth, ...options })

export * from '@testing-library/react-native'
export {
  customRender as render,
  renderWithAuth,
  customRenderHook as renderHook,
  renderHookWithAuth,
}
