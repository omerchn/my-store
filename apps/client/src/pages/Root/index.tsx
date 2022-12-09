import { Outlet } from 'react-router-dom'

// components
import Nav from './Nav'

export default function Root() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
