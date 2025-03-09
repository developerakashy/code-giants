import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout(){


    return(
        <div>
            <div className="sticky top-0 z-30">
                <Header />
            </div>
            <div className="pt-16">
            <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout
