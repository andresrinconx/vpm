import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { fetchNewPassword, fetchResetPassword } from '../utils/api'

interface AlertProps {
  error?: boolean
  message?: string
}

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<AlertProps>({})
  const [validToken, setValidToken] = useState(false)
  const [modifiedPassword, setModifiedPassword] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        await fetchNewPassword(token)
        setAlert({
          message: 'Type your new password',
        })
        setValidToken(true)
      } catch (error) {
        setAlert({
          message: error.message,
          error: true
        })
      }
    }

    confirmAccount()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 6) {
      setAlert({
        message: 'Password must be at least 6 characters',
        error: true
      })
      return
    }

    try {
      const res = await fetchResetPassword(token, password)
      setAlert({
        message: res?.msg,
      })
      setModifiedPassword(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Reset your password and Manage your
          <span className='text-black'> Pets</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <Alert
          alert={alert}
        />

        {validToken && (
          <>
            <form onSubmit={handleSubmit}>
              <div className='my-5'>
                <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                <input className='border w-full p-3 bg-gray-100 rounded-xl mt-2'
                  id='password'
                  placeholder='New Password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <input 
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
                type='submit'
                value={'Reset Password'}
              />
            </form>

            {modifiedPassword && (
              <Link className='block text-center my-5 text-gray-500' 
                to='/'>Log in
              </Link>
            )}
          </>
        )}
        
      </div>
    </>
  )
}

export default NewPassword
