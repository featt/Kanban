import { Navigate, Outlet } from "react-router-dom"

const PrivatRoute = () => {
    const token = localStorage.getItem('accessToken')
    return (
        token ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivatRoute