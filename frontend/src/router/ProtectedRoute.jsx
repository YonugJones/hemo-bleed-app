import { Navigate, Outlet } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  // const { auth } = useAuth()

  // return auth?.accessToken ? <Outlet /> : <Navigate to='/login' replace />
  return (
    <div><h1>Protected Route</h1></div>
  )
}

export default ProtectedRoute