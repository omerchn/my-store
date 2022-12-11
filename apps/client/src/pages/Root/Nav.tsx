import { useLocation, useNavigate } from 'react-router-dom'

// components
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    navigate(value)
  }

  return (
    <nav>
      <Tabs value={pathname} onChange={handleChange} centered>
        <Tab label="home" value="/" />
        <Tab label="bought" value="/bought" />
      </Tabs>
    </nav>
  )
}
