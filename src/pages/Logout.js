import { Navigate } from 'react-router-dom'
import { useAuth } from  '../contexts/AuthContext'

function Logout() {
  const { logout } = useAuth();
  logout()
  
  return (
    <Navigate to="/" />
  )
}

export default Logout