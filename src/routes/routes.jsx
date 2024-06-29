import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Register from "../auth/Register"
import Login from "../auth/Login"
import Conversation from "../Conversation/Conversation"
import Home from "../Home/Home"
import Auth from "../layout/Auth"
import Nav from "../layout/Nav"


const router = createBrowserRouter([
    {
        path : "/",
        element :<div> <Nav/> <App/></div>,
        children : [
            {
                path : "register",
                element : <Register/>
            },
            {
                path : 'login',
                element : <Login/>
            },
         
           
            {
                path : "",
                element :<Auth> <Home/></Auth>,
                children : [
                    {
                        path : ':userId',
                        element : <Conversation/>
                    }
                ]
            }
        ]
    }
])
    export default router