import React  from 'react'
import { Navigate, Outlet} from 'react-router-dom';




export const Requireauth = () => {
    const user = localStorage.getItem("User")
    return(
        user ? <Outlet /> : <Navigate to='/' /> 
    )
}