import React from 'react'

import { fireEvent, render, screen } from '@__tests__/utils/custom-render'

import { Switch } from './switch'

describe('component: Switch', () => {
  it('should render with label and initial state', () => {
    const label = 'Toggle Switch'
    render(<Switch label={label} value={true} />)

    const labelElement = screen.getByText(label)
    const switchElement = screen.getByTestId('switch')

    expect(labelElement).toBeOnTheScreen()
    expect(switchElement).toBeOnTheScreen()
  })

  it('should trigger onValueChange when switched', () => {
    const label = 'Toggle Switch'
    const onValueChangeMock = jest.fn()
    render(
      <Switch label={label} value={true} onValueChange={onValueChangeMock} />,
    )

    const switchElement = screen.getByTestId('switch')

    fireEvent(switchElement, 'onValueChange', false)

    expect(onValueChangeMock).toHaveBeenCalledWith(false)
  })
})
