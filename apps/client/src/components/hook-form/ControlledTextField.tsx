import { HTMLInputTypeAttribute } from 'react'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

// components
import TextField from '@mui/material/TextField'

interface FieldProps {
  type?: HTMLInputTypeAttribute
  field: ControllerRenderProps<any, any>
  label: string
  error: FieldError | undefined
  [prop: string]: any
}

export default function ControlledTextField(props: FieldProps) {
  return (
    <TextField
      variant="standard"
      {...props}
      {...props.field}
      value={props.field.value ?? ''}
      type={props.type}
      label={props.label}
      error={!!props.error}
      helperText={props.error?.message}
    />
  )
}
