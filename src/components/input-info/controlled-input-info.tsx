import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { InputInfo, InputInfoProps } from './input-info'

export type ControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  maskFunc?: (text: string) => string
}

type ControlledInputInfoProps<T extends FieldValues> = InputInfoProps &
  ControllerType<T>

export function ControlledInputInfo<T extends FieldValues>(
  props: ControlledInputInfoProps<T>,
) {
  const { name, control, maskFunc, ...inputProps } = props
  const { field, fieldState } = useController({ name, control })

  return (
    <InputInfo
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
