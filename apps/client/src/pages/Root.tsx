import { Outlet, Link } from 'react-router-dom'

export default function Root() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/bought">bought</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
