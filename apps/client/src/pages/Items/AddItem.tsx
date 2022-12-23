import toast from 'react-hot-toast'
import {
  ItemInput,
  useAddItemMutation,
} from '../../../__generated__/types-and-hooks'
import { useState } from 'react'

// components
import ItemFormModal from '../../components/ItemFormModal'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/AddRounded'

interface Props {
  refetch: () => void
}

export default function AddItem(props: Props) {
  const [addItem, { loading, error }] = useAddItemMutation()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (data: ItemInput) => {
    const res = await addItem({ variables: { item: data } })
    if (res.errors) {
      return toast.error('Something went wrong')
    }
    toast.success('Added item')
    props.refetch()
    handleClose()
  }

  return (
    <Fade appear in>
      <Box>
        <Fab color="primary" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
        <ItemFormModal
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
