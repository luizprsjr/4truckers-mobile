import * as Font from 'expo-font'
import React from 'react'

import { fireEvent, render, screen } from '@__tests__/utils/custom-render'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@theme/index'

import { Input } from './input'

const mockProps = {
  placeholder: 'Test Placeholder',
  onChangeText: jest.fn(),
}

describe('component: Input', () => {
  beforeAll(() => Font.loadAsync(Ionicons.font))

  it('should render correctly with default props', () => {
    render(<Input {...mockProps} />)
    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toBeTruthy()
  })

  it('should handle focus and blur correctly', () => {
    render(<Input {...mockProps} />)
    const container = screen.getByTestId('container')
    const input = screen.getByPlaceholderText('Test Placeholder')
    fireEvent(input, 'focus')
    expect(container).toHaveStyle({ borderColor: colors.primary700 })
    fireEvent(input, 'blur')
    expect(container).toHaveStyle({ borderColor: colors.secondary400 })
  })

  it('should call onChangeText when input text changes', () => {
    const onChangeText = jest.fn()
    render(<Input {...mockProps} onChangeText={onChangeText} />)
    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    fireEvent.changeText(inputElement, 'Test Text')
    expect(onChangeText).toHaveBeenCalledWith('Test Text')
  })

  it('should display error message correctly', () => {
    render(<Input {...mockProps} errorMessage="Test Error" />)
    const errorElement = screen.getByText('Test Error')
    expect(errorElement).toBeTruthy()
    expect(errorElement).toHaveStyle({ color: colors.red })
  })

  it('should display left icon correctly', () => {
    render(<Input {...mockProps} leftIcon="add" />)
    const leftIcon = screen.getByTestId('left-icon')
    expect(leftIcon).toBeOnTheScreen()
  })

  it('should display right icon correctly', () => {
    render(<Input {...mockProps} rightIcon="add" />)
    const rightIcon = screen.getByTestId('right-icon')
    expect(rightIcon).toBeOnTheScreen()
  })

  it('should display right and left icon correctly', () => {
    render(<Input {...mockProps} rightIcon="add" leftIcon="apps" />)
    const leftIcon = screen.getByTestId('left-icon')
    const rightIcon = screen.getByTestId('right-icon')
    expect(leftIcon).toBeOnTheScreen()
    expect(rightIcon).toBeOnTheScreen()
  })

  it('should call right icon on press function', () => {
    const mockRightIconOnPress = jest.fn()
    render(
      <Input
        {...mockProps}
        rightIcon="add"
        rightIconOnPress={mockRightIconOnPress}
      />,
    )
    const rightIcon = screen.getByTestId('right-icon')
    fireEvent.press(rightIcon)
    expect(mockRightIconOnPress).toHaveBeenCalled()
  })
})
