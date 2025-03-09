import { EarthLock, Menu, X } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/userContext";
import axios from "axios";

function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user, setUser} = useUser()

    const navigate = useNavigate()

    const logou_user = async()=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/user_logout`,{},{withCredentials:true})
            console.log(res.data)
            setUser(null)
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if(!user?._id){
            navigate('/')
        }
    }, [user])

    return (
      <header className="fixed w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              Talent<span className="text-cyan-400">AI</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              {!user?._id && <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>}
            </div>

            {/* Desktop navigation */}
            {!user?._id && <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
              <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Testimonials</a>
              <a onClick={() => navigate('/user/login')} className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-all transform hover:-translate-y-1">Sign In</a>
              <a onClick={() => navigate('/user/register')} className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-all transform hover:-translate-y-1">Sign Up</a>
            </nav>}

            {user?._id &&
            <nav className="hidden md:flex items-center space-x-8">
                <a onClick={logou_user} className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-full font-semibold text-center hover:bg-cyan-400 hover:text-white transition-colors">Log Out</a>
            </nav>
          }
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <nav className="mt-4 md:hidden flex flex-col space-y-4 pb-4">
              <a href="#features" className="hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#testimonials" className="hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <a onClick={() => navigate('/user/login')} className="hover:text-cyan-400 transition-colors">Sign In</a>
              <a onClick={() => navigate('/user/register')} className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold text-center hover:bg-cyan-400 hover:text-white transition-colors">Sign Up</a>
            </nav>
          )}


        </div>
      </header>
    );
  };


export default Header
