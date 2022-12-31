import { Outlet } from 'react-router-dom'

// components
import Box from '@mui/material/Box'
import Nav from './Nav'
import Auth from './Auth'

export default function Root() {
  return (
    <Box>
      <Box position="relative">
        <Box>
          <Auth />
        </Box>
        <Nav />
      </Box>
      <Outlet />
    </Box>
  )
}
