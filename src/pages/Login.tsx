import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { fetchLogIn } from '../utils/api'
import useAuth from '../hooks/useAuth'

interface AlertProps {
  error?: boolean
  message?: string
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<AlertProps>({})

  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlert({ 
        error: true, 
        message: 'All fields are required' 
      })
      return
    }

    try {
      const res = await fetchLogIn(email, password)
      localStorage.setItem('token', res.token)
      setAuth(res)
      navigate('/admin')
    } catch (error) {
      setAlert({
        error: true,
        message: error.message
      })
    }
  }

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Log In and Manage your
          <span className='text-black'> Pets</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {alert?.message && (
          <Alert alert={alert} />
        )}
        
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
            <input className='border w-full p-3 bg-gray-100 rounded-xl mt-2'
              id='email'
              placeholder='Email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
            <input className='border w-full p-3 bg-gray-100 rounded-xl mt-2'
              id='password'
              placeholder='Password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input 
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
            type='submit'
            value={'Log In'}
          />
        </form>

        <div className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' 
            to='/signup'>Don't your have an account? Sign Up
          </Link>
          <Link className='block text-center my-5 text-gray-500' 
            to='/forgot-password'>I forgot my password
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
