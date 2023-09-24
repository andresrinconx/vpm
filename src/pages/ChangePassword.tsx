import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alert from '../components/Alert'
import useAuth from '../hooks/useAuth'

interface AlertProps {
  error?: boolean
  message?: string
}

const ChangePassword = () => {
  const [pwd, setPwd] = useState({
    password: '',
    password2: ''
  })
  const [alert, setAlert] = useState<AlertProps>({})

  const { updatePassword } = useAuth()

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // validation
    if (Object.values(pwd).some(field => field === '')) {
      setAlert({ error: true, message: 'All fields are required' })
      return
    }

    // min length
    if (pwd.password2.length < 6) {
      setAlert({ error: true, message: 'Password must be at least 6 characters' })
      return
    }

    // success
    const res = await updatePassword(pwd)
    setAlert(res)
  }

  return (
    <>
      <AdminNav />

      <h2 className='font-black text-3xl text-center mt-10'>Change Password</h2>
      <p className='text-xl mt-5 mb-10 text-center'>Change your {''}
        <span className='text-indigo-600 font-bold'>password here</span>
      </p>

      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

          {alert.message && (
            <Alert alert={alert} />
          )}

          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label htmlFor='password' className='uppercase font-bold text-gray-600'>Current Password</label>
              <input className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                id='password'
                name='password'
                placeholder='Current Password'
                type='text'
                onChange={(e) => setPwd({ ...pwd, [e.target.name]: e.target.value })}
              />
            </div>

            <div className='my-3'>
              <label htmlFor='password2' className='uppercase font-bold text-gray-600'>New Password</label>
              <input className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                id='password2'
                name='password2'
                placeholder='New Password'
                type='text'
                onChange={(e) => setPwd({ ...pwd, [e.target.name]: e.target.value })}
              />
            </div>

            <input className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-500 cursor-pointer'
              type='submit'
              value='Save Changes'
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
