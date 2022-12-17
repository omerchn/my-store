import { Item as ItemType } from '../../../__generated__/types-and-hooks'

// components
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'
import { Link } from 'react-router-dom'

interface Props {
  item: ItemType
  action: 'link' | 'buy' | 'none'
}

export default function Item(props: Props) {
  const { item } = props
  return (
    <Grow appear in>
      <Card
        sx={{
          margin: '.5em',
          width: '24em',
          maxWidth: '100%',
        }}
        variant="outlined"
      >
        <Alert severity={!item.bought ? 'success' : 'error'}>
          <Typography
            sx={{
              fontSize: '1em',
              width: 'fit-content',
            }}
            color={!item.bought ? 'success' : 'error'}
          >
            {!item.bought ? 'For Sale!' : 'Item has been purchased'}
          </Typography>
        </Alert>
        <CardContent>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography color="text.secondary">{item.description}</Typography>
          <Typography
            sx={{
              marginTop: '1em',
            }}
          >
            {item.price}$
          </Typography>
        </CardContent>
        {props.action === 'link' ? (
          <CardActions>
            <Link
              to={`/item/${item.id}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button size="small">buy item</Button>
            </Link>
          </CardActions>
        ) : props.action === 'buy' ? (
          <CardActions>
            <div>(stripe element)</div>
          </CardActions>
        ) : null}
      </Card>
    </Grow>
  )
}
