import { createContext, useState, useEffect } from 'react'
import { fetchProfile, fetchUpdatePassword, fetchUpdateProfile } from '../utils/api'

interface Auth {
  name: string
  web: string
  phone: string
  email: string
  _id?: string
}

const AuthContext = createContext<{
  auth: Auth
  setAuth: (auth: Auth) => void
  loading: boolean
  logOut: () => void
  updateProfile: (data: Auth) => any
  updatePassword: (data: {password: string, password2: string}) => any
}>({
  auth: {
    name: '',
    web: '',
    phone: '',
    email: '',
    _id: ''
  },
  setAuth: () => { },
  loading: true,
  logOut: () => { },
  updateProfile: () => { },
  updatePassword: () => { }
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState<Auth>({
    name: '',
    web: '',
    phone: '',
    email: '',
    _id: ''
  })

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setLoading(false)
        return
      }

      // get profile
      try {
        const res = await fetchProfile({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        })
        
        setAuth(res?.profile)
      } catch (error) {
        console.log(error)
        setAuth({
          name: '',
          web: '',
          phone: '',
          email: ''
        })
      }
      setLoading(false)
    }
    authUser()
  }, [])

  const logOut = () => {
    localStorage.removeItem('token')
    setAuth({
      name: '',
      web: '',
      phone: '',
      email: ''
    })
  }

  const updateProfile = async (data: Auth) => {
    const token = localStorage.getItem('token')
      
    if (!token) {
      setLoading(false)
      return
    }
  
    // update
    try {
      await fetchUpdateProfile(data._id as string, data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })

      return {
        message: 'Profile updated successfully'
      }
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  }

  const updatePassword = async (data: {password: string, password2: string}) => {
    const token = localStorage.getItem('token')
      
    if (!token) {
      setLoading(false)
      return
    }

    // update password
    try {
      const res = await fetchUpdatePassword(data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })
      return {
        message: res.msg
      }
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  }
  
  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      loading,
      logOut,
      updateProfile,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext