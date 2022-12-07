import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import ItemsPage from './pages/Items'
import Root from './pages/Root'
import ErrorPage from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ItemsPage bought={false} />,
      },
      {
        path: '/bought',
        element: <ItemsPage bought={true} />,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
