import React from 'react'

import { render } from '@testing-library/react-native'

import { WhatsAppLogo } from './wpp-logo'

describe('WhatsAppLogo component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<WhatsAppLogo />)
    const svgElement = getByTestId('whatsapp-logo')
    expect(svgElement).toBeTruthy()
  })

  it('renders with custom width and height', () => {
    const { getByTestId } = render(<WhatsAppLogo width={50} height={50} />)
    const svgElement = getByTestId('whatsapp-logo')
    expect(svgElement).toHaveStyle({ width: 50, height: 50 })
  })
})
