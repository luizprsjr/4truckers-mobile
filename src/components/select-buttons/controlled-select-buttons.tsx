import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormWatch,
} from 'react-hook-form'

import { SelectButtons } from './select-buttons'

export type ControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  watch: UseFormWatch<T>
}

type ControlledSelectButtonsProps<T extends FieldValues> = ControllerType<T>

export function ControlledSelectButtons<T extends FieldValues>(
  props: ControlledSelectButtonsProps<T>,
) {
  const { name, control, watch } = props
  const { field } = useController({ name, control })

  return (
    <SelectButtons selected={watch(field.name)} onChange={field.onChange} />
  )
}
