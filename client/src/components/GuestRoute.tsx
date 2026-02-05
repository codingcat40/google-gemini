import { Outlet, Navigate } from "react-router-dom"

type Props =  {
    User: any | null
}

export function GuestRoute({ User }: Props) {
  if (User) {
    return <Navigate to="/home" replace />
  }
  return <Outlet />
}

