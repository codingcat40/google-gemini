
import { Outlet, Navigate } from "react-router-dom"

type Props = {
    isAuthenticated: boolean
}

export const PrivateRoutes = ({isAuthenticated}:   Props) => {
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
  
    return (
    <Outlet />
  )
}