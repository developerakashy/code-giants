import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: 'login', element: <Login/> },
            { path: 'register', element: <Registration/> },
        ]
    }
])

export default router
