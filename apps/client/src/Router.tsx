import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import ItemsPage from './pages/Items'
import Root from './pages/Root'
import NotFoundPage from './pages/NotFound'
import ItemPage from './pages/Item'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <ItemsPage bought={false} withAddItem={true} />,
      },
      {
        path: '/bought',
        element: <ItemsPage bought={true} withAddItem={false} />,
      },
      {
        path: '/item/:itemId',
        element: <ItemPage />,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
