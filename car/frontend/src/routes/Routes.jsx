import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/home/home/Home";
import About from "../pages/home/about/About";
import Service from "../pages/home/services/Service";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import CheckOut from "../pages/chceckout/CheckOut";
import Bookings from "../pages/bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
{
    path:'/',
    element:<Main/>,
    children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/about',
            element:<About/>
        },
        {
            path:'/service',
            element:<Service/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/signup',
            element:<SignUp/>
        },
        {
            path:'/checkout/:id',
            element:<PrivateRoutes><CheckOut/></PrivateRoutes>,
            loader: ({params})=> fetch(`http://localhost:4000/services/${params.id}`)
        },
        {
            path:'/bookings',
            element: <PrivateRoutes><Bookings/></PrivateRoutes>,
           
        }
    ]
}
])


export default router