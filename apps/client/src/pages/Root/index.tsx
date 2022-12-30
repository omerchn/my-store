import { Outlet } from 'react-router-dom'

// components
import Box from '@mui/material/Box'
import Nav from './Nav'
import Auth from './Auth'

export default function Root() {
  return (
    <Box>
      <Box position="relative">
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            zIndex: '1',
            padding: '0 1em',
          }}
        >
          <Auth />
        </Box>
        <Nav />
      </Box>
      <Outlet />
    </Box>
  )
}
