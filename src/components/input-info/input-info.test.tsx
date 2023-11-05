import React from 'react'

import { fireEvent, render, screen } from '@__tests__/utils/custom-render'
import { colors } from '@theme/index'

import { InputInfo } from './input-info'

const mockProps = {
  label: 'Test Label',
  placeholder: 'Test Placeholder',
  onChangeText: jest.fn(),
}

describe('component: InputInfo', () => {
  it('should render correctly with default props', () => {
    render(<InputInfo {...mockProps} />)
    const labelElement = screen.getByText('Test Label')
    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(labelElement).toBeTruthy()
    expect(inputElement).toBeTruthy()
  })

  it('should handle focus and blur correctly', async () => {
    render(<InputInfo {...mockProps} />)
    const container = screen.getByTestId('container')
    const input = screen.getByPlaceholderText('Test Placeholder')
    fireEvent(input, 'focus')
    expect(container).toHaveStyle({ borderColor: colors.primary700 })
    fireEvent(input, 'blur')
    expect(container).toHaveStyle({ borderColor: colors.secondary400 })
  })

  it('should call onChangeText when input text changes', () => {
    const onChangeText = jest.fn()
    render(<InputInfo {...mockProps} onChangeText={onChangeText} />)
    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    fireEvent.changeText(inputElement, 'Test Text')
    expect(onChangeText).toHaveBeenCalledWith('Test Text')
  })

  it('should display error message correctly', () => {
    render(<InputInfo {...mockProps} errorMessage="Test Error" />)
    const errorElement = screen.getByText('Test Error')
    expect(errorElement).toBeTruthy()
    expect(errorElement).toHaveStyle({ color: colors.red })
  })

  it('should render measurement unit when measurementUnit is provided', () => {
    render(<InputInfo {...mockProps} measurementUnit="cm" />)
    const unitElement = screen.getByText('cm')
    expect(unitElement).toBeTruthy()
  })

  it('should not render measurement unit when measurementUnit is not provided', () => {
    render(<InputInfo {...mockProps} />)
    const unitElement = screen.queryByText('cm')
    expect(unitElement).toBeNull()
  })

  it('should render as a multiline input when multiline prop is provided', () => {
    render(<InputInfo {...mockProps} multiline />)
    const inputElement = screen.getByTestId('container')
    expect(inputElement).toHaveStyle({ minHeight: 100 })
  })
})
