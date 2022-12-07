import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import ItemsPage from './pages/Items'
import BoughtItemsPage from './pages/BoughtItems'
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
        element: <ItemsPage />,
      },
      {
        path: '/bought',
        element: <BoughtItemsPage />,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
