import { fireEvent, render, screen } from '@testing-library/react-native'
import { colors } from '@theme/index'

import { Button } from './button'

describe('component: Button', () => {
  it('should display the load component when load prop is provided', () => {
    render(<Button title="test" isLoading />)
    const loading = screen.getByTestId('loading-component')
    expect(loading).toBeTruthy()
  })

  it('should call the onPress function when the button is clicked', () => {
    const onPress = jest.fn()
    render(<Button title="test" onPress={onPress} />)
    const title = screen.getByText('test')
    fireEvent.press(title)
    expect(onPress).toBeCalledTimes(1)
  })

  it('should be disabled when disabled is true', () => {
    render(<Button title="test" disabled />)
    const button = screen.getByTestId('button')
    expect(button).toBeDisabled()
  })

  it('should be disabled when isLoading is true', () => {
    render(<Button title="test" isLoading />)
    const loading = screen.getByTestId('button')
    expect(loading).toBeDisabled()
  })

  it('should apply the correct style when the variant is set to secondary', () => {
    render(<Button title="test" variant="secondary" />)
    const loading = screen.getByTestId('button')
    const title = screen.getByText('test')
    expect(loading).toHaveStyle({ backgroundColor: colors.white })
    expect(title).toHaveStyle({ color: colors.primary950 })
  })
})
