import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location= useLocation()
if(loading){
    return <progress className="progress progress-error w-56" value="70" max="100"></progress>
}
    if(user?.email){
        return children
    }
  return <Navigate state={{from:location.pathname}} to='/login' replace></Navigate>
}

export default PrivateRoutes