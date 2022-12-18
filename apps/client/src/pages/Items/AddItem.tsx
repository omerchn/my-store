import {
  ItemInput,
  useAddItemMutation,
} from '../../../__generated__/types-and-hooks'
import { useState } from 'react'

// components
import ItemModal from '../../components/ItemModal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'

interface Props {
  refetch: () => void
}

export default function AddItem(props: Props) {
  const [addItem, { loading, error }] = useAddItemMutation()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (data: ItemInput) => {
    await addItem({ variables: { item: data } })
    props.refetch()
    handleClose()
  }

  return (
    <Fade appear in>
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Item
        </Button>
        <ItemModal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          loading={loading}
          error={error?.message}
        />
      </Box>
    </Fade>
  )
}
