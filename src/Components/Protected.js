import { Outlet,Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const Protected = () => {
    const token = localStorage.getItem("token")|| Cookies.get("token");
    // console.log(token)
    return (
        <>
        {token ? <Outlet/> : <Navigate to="/login"/>}
        </>
    )
    
}
export default Protected;