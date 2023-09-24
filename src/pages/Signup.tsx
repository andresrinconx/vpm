import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import { fetchRegisterVet } from '../utils/api'

interface AlertProps {
  error?: boolean
  message?: string
}

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const [alert, setAlert] = useState<AlertProps>({})

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate empty fields
    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ error: true, message: 'All fields are required' })
      return
    }

    // Validate password
    if (password !== repeatPassword) {
      setAlert({ error: true, message: 'Passwords do not match' })
      return
    }

    // Password length
    if (password.length < 6) {
      setAlert({ error: true, message: 'Password must be at least 6 characters' })
      return
    }

    // Sign Up
    setAlert({})
    try {
      await fetchRegisterVet({ name, email, password })
      setAlert({ error: false, message: 'User created successfully, check your email' })
    } catch (error) {
      setAlert({ error: true, message: error.message }) // error.message por que throw new Error tiene message
    }
  }

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Create your account and Manage your
          <span className='text-black'> Pets</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <form onSubmit={handleSubmit}>
          {alert?.message && (
            <Alert alert={alert} />
          )}

          <div className='my-5'>
            <label htmlFor='name' className='uppercase text-gray-600 block text-xl font-bold'>Name</label>
            <input className='border w-full p-3 bg-gray-100 rounded-xl mt-2'
              id='name'
              placeholder='Name'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
          <div className='my-5'>
            <label htmlFor='repeat-password' className='uppercase text-gray-600 block text-xl font-bold'>Repeat Password</label>
            <input className='border w-full p-3 bg-gray-100 rounded-xl mt-2'
              id='repeat-password'
              placeholder='Repeat Password'
              type='password'
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </div>

          <input 
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
            type='submit'
            value={'Sign Up'}
          />
        </form>

        <div className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' 
            to='/'>Do your have an account? Log in
          </Link>
          <Link className='block text-center my-5 text-gray-500' 
            to='/forgot-password'>I forgot my password
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signup
