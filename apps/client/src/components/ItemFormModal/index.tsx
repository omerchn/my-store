import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// components
import ControlledTextField from '../hook-form/ControlledTextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Grow from '@mui/material/Grow'
import Alert from '@mui/material/Alert'
import { TransitionProps } from '@mui/material/transitions'

const ItemSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  description: z.string().trim().min(1, 'Required'),
  price: z.coerce.number().min(0.01, 'Required'),
})

export type ItemInput = z.infer<typeof ItemSchema>

const DEFAULT = {
  name: undefined,
  description: undefined,
  price: undefined,
}

interface Props {
  onSubmit: (data: ItemInput) => void
  open: boolean
  onClose: () => void
  loading?: boolean
  error?: string
}

export default function ItemFormModal(props: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ItemInput>({
    resolver: zodResolver(ItemSchema),
    defaultValues: DEFAULT,
  })

  const onSubmit: SubmitHandler<ItemInput> = (data) => {
    props.onSubmit(data)
    reset()
  }

  const resetForm = () => {
    props.onClose()
    reset()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Item Details</DialogContentText>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexWrap="wrap" gap=".5em">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <ControlledTextField
                    field={field}
                    label="name"
                    error={errors.name}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <ControlledTextField
                    type="number"
                    field={field}
                    label="price (USD)"
                    error={errors.price}
                    sx={{ width: '6em' }}
                  />
                )}
              />
            </Box>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ControlledTextField
                  field={field}
                  label="description"
                  error={errors.description}
                />
              )}
            />
          </Box>
        </DialogContent>
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <DialogActions>
          <Button variant="text" onClick={resetForm}>
            cancel
          </Button>
          <Button variant="outlined" type="submit" disabled={props.loading}>
            add
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />
})
