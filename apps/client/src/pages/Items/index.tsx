import { useGetItemsQuery } from '../../../__generated__/types-and-hooks'

// components
import Item from '../../components/Item'
import AddItem from './AddItem'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  bought: boolean
  addItemBtn: boolean
}

export default function ItemsPage(props: Props) {
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
          {props.addItemBtn && <AddItem refetch={refetch} />}
          <Box
            sx={{
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
