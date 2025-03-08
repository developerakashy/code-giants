import { useState } from "react"
import { useUser } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Sparkle } from "lucide-react"

function Login(){
    const {setUser, loading, setLoading} = useUser()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        let { name, value } = e.target

        setFormData(prev => ({...prev, [name]: value}))
        value = value?.trim()
        const newErrors = {}

        if(name === 'email'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            console.log(value)

            if(!value){
                newErrors.email = '*Email address is required'

            } else if(!emailRegex.test(value)) {
                newErrors.email = '*Enter a valid email'

            } else {
                newErrors.email = undefined
            }

        }

        if(name === 'password'){
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

            if(!value){
                newErrors.password = '*Password is required'

            } else if(!passwordRegex.test(value)){
                newErrors.password = '*Atleast 8 characters, including one number and one special character'

            } else {
                newErrors.password = undefined
            }

        }

        if(Object.keys(newErrors).length > 0) setErrors(prev => ({...prev, ...newErrors}))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const {email, password} = formData
        const emptyErrors = {}

        if(email?.trim() === '') emptyErrors.username = '*Email is required'
        if(password?.trim() === '') emptyErrors.password = '*Password is required'

        if(Object.keys(emptyErrors).length > 0){
            setErrors(prev => ({...emptyErrors, ...prev}))
            toast.warn('All fields are required')
            return
        }

        const isFormValid = Object.values(errors)?.some(val => val !== undefined)

        if(isFormValid){
            toast.warn('Error in fields')
            return
        }

        loginUser()

    }

    const loginUser = async () => {
        setLoading(true)

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, formData, {withCredentials: true})
            console.log(data.data)
            setUser(data.data)

            setTimeout(() => {
                toast.success(`You logged in successfully`)
                navigate('/')

            }, 500)

        } catch (error) {
            console.log(error)
            toast.error('username or password is incorrect')

        } finally {
            setTimeout(() => {
                setLoading(false)

            }, 600)
        }
    }

    return(
        <div className="flex justify-center bg-blue-50 min-h-screen">

            <form className="sm:shadow-md sm:rounded-2xl sm:my-12 sm:h-fit bg-white w-full  sm:max-w-[520px]">
                <div className='flex flex-col items-center w-full pt-16 sm:pt-6'>
                    <div className="h-18">
                        <Sparkle className="h-14 w-14 shadow-lg p-3 rounded-lg stroke-blue-200 fill-blue-200"/>
                    </div>

                    <p className="text-4xl mb-4">Sign In</p>
                    <p className='text text-slate-500 mb-4'>To continue to BlueSky</p>
                </div>

                <div className='w-full flex flex-col items-center px-6'>

                    <div className="w-full pb-6 pt-6 border-t-1 border-slate-200">
                        <label className="block text-slate-500 text-sm mb-1">Email*</label>
                        <input
                            name='email'
                            className="outline-slate-300 outline-1 focus:outline-1 focus:outline-blue-400 w-full px-3 py-2  rounded-lg"
                            type="text"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors?.email && <p className='text-sm text-red-600 mt-1'>{errors?.email}</p>}
                    </div>

                    <div className="w-full pb-6">
                        <label className="block text-slate-500 text-sm mb-1">Password*</label>
                        <div className='flex items-center relative'>
                            <input
                                name='password'
                                className="outline-slate-300 outline-1 focus:outline-1 focus:outline-blue-400 w-full px-3 py-2  rounded-lg"
                                type={showPassword ? `text` : `password`}
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {formData.password &&
                            <button type='button' className='cursor-pointer absolute right-2' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ?
                                    <img className='h-6 w-6' src="../../hidden.png" alt="" /> :
                                    <img className='h-6 w-6' src="../../view.png" alt="" />
                                }
                            </button>}
                        </div>
                        {errors?.password && <p className='text-sm text-red-600 mt-1'>{errors?.password}</p>}
                    </div>

                    <button onClick={(e) => handleLogin(e)} className="cursor-pointer bg-indigo-500 text-white py-2 w-full rounded-full">Sign in</button>

                    <div className="flex mt-4 mb-8 gap-1">
                        <p>Don't have an account?</p> <button type='button' onClick={() => navigate('/register')} className="cursor-pointer text-indigo-700">Sign up</button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Login
