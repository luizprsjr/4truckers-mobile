import React from 'react'

import { fireEvent, render, screen } from '@__tests__/utils/custom-render'
import { colors } from '@theme/index'

import { SelectButtons } from './select-buttons'

describe('component: SelectButtons', () => {
  const onChangeMock = jest.fn()

  it('should render the correctly user styles by default', () => {
    render(<SelectButtons onChange={onChangeMock} />)
    const userButton = screen.getByTestId('user-button')
    const truckerButton = screen.getByTestId('trucker-button')
    const userButtonText = screen.getByText('Usuário')
    const truckerButtonText = screen.getByText('Caminhoneiro')

    expect(userButton).toHaveStyle({ backgroundColor: colors.primary700 })
    expect(truckerButton).toHaveStyle({ backgroundColor: 'transparent' })
    expect(userButtonText).toHaveStyle({ color: colors.white })
    expect(truckerButtonText).toHaveStyle({ color: colors.secondary400 })
  })

  it('should render by default with USER selected and styles', () => {
    render(<SelectButtons onChange={onChangeMock} selected="TRUCKER" />)
    const userButton = screen.getByTestId('user-button')
    const truckerButton = screen.getByTestId('trucker-button')
    const userButtonText = screen.getByText('Usuário')
    const truckerButtonText = screen.getByText('Caminhoneiro')

    expect(truckerButton).toHaveStyle({ backgroundColor: colors.primary700 })
    expect(userButton).toHaveStyle({ backgroundColor: 'transparent' })
    expect(truckerButtonText).toHaveStyle({ color: colors.white })
    expect(userButtonText).toHaveStyle({ color: colors.secondary400 })
  })

  it('should call onChange with "USER" when the user button is pressed', () => {
    render(<SelectButtons selected="TRUCKER" onChange={onChangeMock} />)
    const userButton = screen.getByText('Usuário')

    fireEvent.press(userButton)

    expect(onChangeMock).toHaveBeenCalledWith('USER')
  })

  it('should call onChange with "TRUCKER" when the trucker button is pressed', () => {
    render(<SelectButtons selected="USER" onChange={onChangeMock} />)
    const truckerButton = screen.getByText('Caminhoneiro')

    fireEvent.press(truckerButton)

    expect(onChangeMock).toHaveBeenCalledWith('TRUCKER')
  })
})
