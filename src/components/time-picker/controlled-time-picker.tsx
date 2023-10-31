import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { TimePicker, TimePickerProps } from './time-picker'

export type ControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  // maskFunc?: (text: string) => string
}

type ControlledTimePickerProps<T extends FieldValues> = TimePickerProps &
  ControllerType<T>

export function ControlledTimePicker<T extends FieldValues>(
  props: ControlledTimePickerProps<T>,
) {
  const { name, control, ...pickerProps } = props
  const { field, fieldState, formState } = useController({ name, control })

  return (
    <TimePicker
      onControllerChange={field.onChange}
      errorMessage={fieldState.error?.message}
      reset={formState.isSubmitSuccessful}
      {...pickerProps}
    />
  )
}
