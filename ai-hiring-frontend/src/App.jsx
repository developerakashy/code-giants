import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UserContextProvider } from './context/userContext'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ToastContainer } from 'react-toastify'
import { ring2 } from 'ldrs'

ring2.register()

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)


  const userContextValues = useMemo(() => ({
    user, setUser, loading, setLoading
  }), [user, loading])

  return (
    <UserContextProvider value={userContextValues}>
      {loading &&
        <div className='z-50 fixed bg-blue-50/50  right-0 left-0 top-0 bottom-0 flex flex-col gap-2 justify-center items-center'>
            <l-ring-2
              size="40"
              stroke="5"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="0.8"
              color="black"
            ></l-ring-2>
        </div>
      }
      <ToastContainer />
      <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}/>
    </UserContextProvider>
  )
}

export default App
