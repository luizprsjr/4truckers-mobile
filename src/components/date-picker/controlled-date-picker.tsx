import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { DatePicker, DatePickerProps } from './date-picker'

export type ControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  // maskFunc?: (text: string) => string
}

type ControlledDatePickerProps<T extends FieldValues> = DatePickerProps &
  ControllerType<T>

export function ControlledDatePicker<T extends FieldValues>(
  props: ControlledDatePickerProps<T>,
) {
  const { name, control, ...pickerProps } = props
  const { field, fieldState, formState } = useController({ name, control })

  return (
    <DatePicker
      onControllerChange={field.onChange}
      errorMessage={fieldState.error?.message}
      reset={formState.isSubmitSuccessful}
      {...pickerProps}
    />
  )
}
