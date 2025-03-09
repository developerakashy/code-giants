import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Sparkle } from "lucide-react";
import { debounce } from "lodash";
import axios from "axios";
import { toast } from "react-toastify";

function Registration(){
    const {loading, setLoading} = useUser()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    })
    const [email, setEmail] = useState(null)
    const [errors, setErrors] = useState({})
    const [emailExist, setEmailExist] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        let {name, value} = e.target
        const newErrors = {}

        value = value?.trim()
        setFormData(prev => ({...prev, [name]: value }))

        if(name === 'fullName'){
            if(!value){
                newErrors.fullName = '*Full name is required'

            } else if(value?.length < 3) {
                newErrors.fullName = '*please enter atleast 3 characters'

            } else {
                newErrors.fullName = undefined
            }
        }

        if(name === 'email'){
            setEmailExist(false)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            console.log(value)

            if(!value){
                newErrors.email = '*Email address is required'

            } else if(!emailRegex.test(value)) {
                newErrors.email = '*Enter a valid email'

            } else {
                newErrors.email = undefined
                setEmail(value)
            }

        }

        if(name === 'password'){
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

            if(!value){
                newErrors.password = '*Password is required'

            } else if(!passwordRegex.test(value)) {
                newErrors.password = '*Atleast 8 characters, including one number and one special character'

            } else {
                newErrors.password = undefined
            }
        }

        if(Object.keys(newErrors).length > 0) setErrors(prev => ({...prev, ...newErrors}))

    }

    const checkUserAvailability = async (email) => {
        const reqBody = { email }
        console.log(email)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/exist`, reqBody)
            console.log(data.data)
            setEmailExist(data?.data?.exist)

        } catch (error) {
            console.log(error)

        } finally {

        }

    }

    const debounceCheckUserWithEmail = useMemo(() => debounce(() => checkUserAvailability(email) ,1000), [email])

    useEffect(() => {
        if(email?.trim()){
            debounceCheckUserWithEmail()
        }

        return () => {
            debounceCheckUserWithEmail.cancel()
        }

    }, [email, debounceCheckUserWithEmail])

    const handelUserRegistration = async (e) => {
        e.preventDefault()
        const emptyEntry = Object.values(formData)?.some(val => val === '')

        if(emptyEntry){
            let emptyErrors = {}
            let keys = Object.keys(formData)

            keys.map(key => formData[key] !== '' ? '' : emptyErrors[key] = `*${key.charAt(0).toUpperCase()}${key.slice(1)} is required`)

            if(Object.keys(emptyErrors).length > 0) setErrors(prev => ({...emptyErrors, ...prev}))

            toast.warn('All fields are required')
            return

        }

        const isFormValid = Object.values(errors)?.some(val => val !== undefined)

        if(isFormValid){
            toast.error('errors in fields')
            return
        }

        if(emailExist){
            toast.warn('Account exist with provided Email ID. Try to sign in')
            return
        }

        createUser()

    }

    const createUser = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/user_register`, {
                fullName: `${formData?.fullName}`,
                email: formData?.email,
                password: formData?.password
            })

            console.log(data)
            toast.success('user created successfully')

            setTimeout(() => {
                setFormData({
                    fullName: '',
                    email: '',
                    password: ''
                })

                setEmail(null)
                setShowPassword(false)
                setErrors({})
                navigate('/login')
            }, 500)


        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            if(error?.response?.data?.message?.userExist){
                setErrors(prev => ({...prev, email: '*Email ID already exist with an account. Try to sign in'}))
            }
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 600)
        }
    }

    return(
        <div className="flex justify-center bg-blue-50 min-h-screen">

            <form className="sm:shadow-md sm:rounded-2xl sm:my-12 sm:h-fit bg-white w-full sm:max-w-[520px]">
                <div className='flex flex-col items-center w-full pt-6'>
                    <div className="h-18">
                        <Sparkle className="h-14 w-14 shadow-lg p-3 rounded-lg stroke-blue-200 fill-blue-200"/>
                    </div>

                    <p className="text-4xl mb-4">Sign Up</p>
                    <p className='text text-slate-500 mb-4'>To continue to TALENT AI</p>
                </div>

                <div className='w-full flex flex-col items-center px-6'>

                    <div className="w-full pb-6">
                        <label className="block text-slate-500 text-sm mb-1 pt-6 border-t-1 border-slate-200">Full Name*</label>
                        <input
                            name='fullName'
                            className="outline-slate-300 outline-1 focus:outline-1 focus:outline-blue-400 w-full px-3 py-2  rounded-lg"
                            type="text"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors?.fullName && <p className='text-sm text-red-600 mt-1'>{errors?.fullName}</p>}
                    </div>


                    <div className="w-full pb-6">
                        <label className="block text-slate-500 text-sm mb-1">Email ID*</label>
                        <input
                            name='email'
                            className="outline-slate-300 outline-1 focus:outline-1 focus:outline-blue-400 w-full px-3 py-2 rounded-lg"
                            type="email"
                            placeholder="Enter Email ID"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e)}

                        />
                        {errors?.email && <p className='text-sm text-red-600 mt-1'>{errors?.email}</p>}
                        {
                            emailExist && <p className='text-sm text-red-600 mt-1'>*Email ID already exist with an account. Try to sign in</p>
                        }
                    </div>


                    <div className="w-full pb-6">
                        <label className="block text-slate-500 text-sm mb-1">Password*</label>
                        <div className='flex items-center relative'>
                            <input
                                name='password'
                                className="outline-slate-300 outline-1 focus:outline-1 focus:outline-blue-400 w-full px-3 py-2  rounded-lg"
                                type={showPassword ? `text` : `password`}
                                placeholder="Create Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {formData.password &&
                            <button type='button' className='cursor-pointer absolute right-2' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ?
                                    <Eye className="h-6 w-6"/> :
                                    <EyeOff className="h-6 w-6"/>
                                }
                            </button>}
                        </div>
                        {errors?.password && <p className='text-sm text-red-600 mt-1'>{errors?.password}</p>}
                    </div>

                    <button onClick={(e) => handelUserRegistration(e)} className="cursor-pointer bg-indigo-600 text-white py-2 w-full rounded-full">Sign up</button>

                    <div className="flex mt-8 mb-6 gap-1">
                        <p>Already have an account?</p> <button type='button' onClick={() => navigate('/user/login')} className="cursor-pointer text-indigo-700">Sign in</button>
                    </div>
                </div>

            </form>


        </div>
    )
}

export default Registration
