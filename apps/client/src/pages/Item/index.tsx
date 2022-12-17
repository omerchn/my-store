import { useGetItemQuery } from '../../../__generated__/types-and-hooks'

// components
import Item from '../../components/Item'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useParams } from 'react-router-dom'

export default function ItemPage() {
  let { itemId } = useParams()

  if (!itemId) return null

  const { data, loading, error } = useGetItemQuery({
    variables: { id: itemId },
  })

  return (
    <Box
      sx={{
        padding: '2em 1em',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : loading ? (
        <CircularProgress />
      ) : !data?.item ? (
        <Alert severity="info">Item not found</Alert>
      ) : (
        <Item item={data.item} action={!data.item.bought ? 'buy' : 'none'} />
      )}
    </Box>
  )
}
