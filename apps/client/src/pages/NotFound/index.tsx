// components
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        padding: '2em 1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Alert severity="info">Page not found</Alert>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
        }}
      >
        <Button variant="outlined" sx={{ margin: '1em' }}>
          home page
        </Button>
      </Link>
    </Box>
  )
}
