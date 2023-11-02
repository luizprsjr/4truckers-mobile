import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { Input, InputProps } from './input'

export type ControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  maskFunc?: (text: string) => string
}

type ControlledInputProps<T extends FieldValues> = InputProps &
  ControllerType<T>

export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>,
) {
  const { name, control, maskFunc, ...inputProps } = props
  const { field, fieldState } = useController({ name, control })

  return (
    <Input
      ref={field.ref}
      value={field.value}
      onChangeText={(text) => {
        if (maskFunc) {
          const formattedText = maskFunc(text)
          field.onChange(formattedText)
        } else {
          field.onChange(text)
        }
      }}
      errorMessage={fieldState.error?.message}
      {...inputProps}
    />
  )
}
