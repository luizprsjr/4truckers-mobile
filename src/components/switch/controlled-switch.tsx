import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { Switch, SwitchComponentProps } from './switch'

export type ControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
}

type ControlledSwitchProps<T extends FieldValues> = SwitchComponentProps &
  ControllerType<T>

export function ControlledSwitch<T extends FieldValues>(
  props: ControlledSwitchProps<T>,
) {
  const { name, control, ...switchProps } = props
  const { field } = useController({ name, control })

  return (
    <Switch
      onValueChange={(value) => field.onChange(value)}
      value={field.value}
      {...switchProps}
    />
  )
}
