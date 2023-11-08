import React from 'react'

import { mockedGoBack } from '@__tests__/mocks/libs/react-navigation-native'
import { fireEvent, render, screen } from '@__tests__/utils/custom-render'

import { Header } from './header'

describe('Header Component', () => {
  beforeEach(() => {
    mockedGoBack.mockClear()
  })

  it('should render the Header without a back button by default', () => {
    const { getByText, queryByTestId } = render(<Header />)

    expect(queryByTestId('back-button')).toBeNull()
    expect(getByText('4Truckers')).toBeTruthy()
  })

  it('should render the Header with a back button when hasBackButton is true', () => {
    const { getByText, getByTestId } = render(<Header hasBackButton />)
    const backButton = getByTestId('back-button')

    expect(backButton).toBeTruthy()
    expect(getByText('4Truckers')).toBeTruthy()
  })

  it('should navigate back when the back button is pressed', () => {
    render(<Header hasBackButton={true} />)
    const backButton = screen.getByTestId('back-button')

    fireEvent.press(backButton)
    expect(mockedGoBack).toHaveBeenCalled()
  })

  it('should render a large Header when isLarge is true', () => {
    const { getByTestId } = render(<Header isLarge />)
    const headerContainer = getByTestId('container')

    expect(headerContainer).toHaveStyle({ paddingVertical: 86 })
  })
})
