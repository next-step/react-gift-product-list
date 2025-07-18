import { Navigate, useLocation } from 'react-router-dom'
import { useUserContext } from '@/contexts/UserContext'
import type { ReactNode } from 'react'
import { ROUTE_PATH } from './Router'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useUserContext()
  const location = useLocation()

  if (!!!user) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default PrivateRoute
