// hooks
import { useAuth } from '../../hooks/useAuth'

// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Auth() {
  const { isAuthed, login, logout } = useAuth()

  return (
    <Box>
      {!isAuthed ? (
        <Button variant="contained" onClick={login}>
          login
        </Button>
      ) : (
        <Button color="error" onClick={logout}>
          logout
        </Button>
      )}
    </Box>
  )
}
