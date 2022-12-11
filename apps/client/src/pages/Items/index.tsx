import { useGetItemsQuery } from '../../../__generated__/types-and-hooks'

// components
import Item from '../../components/Item'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  bought: boolean
}

export default function ItemsPage(props: Props) {
  const { data, loading } = useGetItemsQuery({
    variables: {
      filterBought: {
        bought: props.bought,
      },
    },
  })

  return loading ? (
    <Box
      sx={{
        padding: '2em 2.5em',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        padding: '1em',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {data?.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Box>
  )
}
