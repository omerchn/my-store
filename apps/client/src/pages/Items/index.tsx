import { useGetItemsQuery } from '../../../__generated__/types-and-hooks'

// hooks
import { useAuth } from '../../hooks/useAuth'

// components
import Item from '../../components/Item'
import AddItem from './AddItem'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  bought: boolean
  withAddItem: boolean
}

export default function ItemsPage(props: Props) {
  const { isAuthed } = useAuth()
  const { data, loading, error, refetch } = useGetItemsQuery({
    variables: {
      filterBought: {
        bought: props.bought,
      },
    },
  })

  return (
    <Box
      sx={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <>
          {props.withAddItem && isAuthed && <AddItem refetch={refetch} />}
          <Box
            sx={{
              width: '100%',
              padding: '1em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {data?.items.map((item) => (
              <Item
                key={item.id}
                item={item}
                action={!item.bought ? 'link' : 'none'}
                refetch={refetch}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
