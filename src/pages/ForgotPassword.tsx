import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import { fetchForgotPassword } from '../utils/api'

interface AlertProps {
  error?: boolean
  message?: string
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<AlertProps>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      setAlert({
        message: 'Email is required',
        error: true
      })
      setLoading(false) 
      return
    }
    
    try {
      const res = await fetchForgotPassword(email)
      setAlert({
        message: res?.msg,
      })
    } catch (error) {
      setAlert({
        message: error.message,
        error: true
      })
    }
    setLoading(false) 
  }

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Get access and don't lose your
          <span className='text-black'> Pets</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!loading && (
          <Alert
            alert={alert}
          />
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
          <input 
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
            type='submit'
            value={'Send instructions'}
          />
        </form>

        <div className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' 
            to='/'>Do your have an account? Log in
          </Link>
          <Link className='block text-center my-5 text-gray-500' 
            to='/signup'>Don't your have an account? Sign Up
          </Link>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
