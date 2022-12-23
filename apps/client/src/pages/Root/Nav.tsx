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
    <nav
      style={{
        backgroundColor: '#F7FAFC',
        boxShadow: 'inset 0 -1px #eee',
      }}
    >
      <Tabs
        value={pathname.includes('item') ? 'hidden' : pathname}
        onChange={handleChange}
        centered
        TabIndicatorProps={
          pathname.includes('item')
            ? {
                style: { display: 'none' },
              }
            : {}
        }
      >
        <Tab
          disabled
          label="hidden"
          value="hidden"
          sx={{
            width: '0',
            minWidth: '0',
            padding: '0',
          }}
        />
        <Tab label="home" value="/" />
        <Tab label="bought" value="/bought" />
      </Tabs>
    </nav>
  )
}
