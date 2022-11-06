import { Navigate, Outlet } from "react-router-dom"

const PrivatRoute = () => {
    const token = true
    return (
        token ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivatRoute