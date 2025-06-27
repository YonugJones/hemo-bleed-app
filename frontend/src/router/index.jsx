import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import NotFound from '../pages/notFound/NotFound'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> }
    ],
  },
  {
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
  },
  { path: '*', element: <NotFound /> }
])

export default router