import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Layout from "./pages/Layout"
import Landing from "./pages/Landing";
import CandidateApplicationForm from "./pages/CandidateApplicationForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            { index: true, path: '/', element: <Landing/> },
            { path: 'dashboard', element: <CandidateApplicationForm/> },
        ]
    },
    {
        path: "/user",
        children: [
            { path: 'login', element: <Login/> },
            { path: 'register', element: <Registration/> },
        ]
    }
])

export default router
