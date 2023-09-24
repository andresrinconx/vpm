import { useState, useEffect } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alert from '../components/Alert'

interface Profile {
  name: string
  web: string
  phone: string
  email: string
  _id: string
}

interface AlertProps {
  error?: boolean
  message?: string
}

const EditProfile = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    web: '',
    phone: '',
    email: '',
    _id: ''
  })
  const [alert, setAlert] = useState<AlertProps>({})

  const { auth, updateProfile } = useAuth()

  useEffect(() => {
    setProfile({
      name: auth.name,
      web: auth.web,
      phone: auth.phone,
      email: auth.email,
      _id: auth._id || ''
    })
  }, [auth])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const { name, email } = profile

    // validation
    if (!name || !email) {
      setAlert({ error: true, message: 'Name and email are required' })
      return
    }

    // update profile
    const res = await updateProfile(profile)
    setAlert(res)
  }
  
  return (
    <>
      <AdminNav />

      <h2 className='font-black text-3xl text-center mt-10'>Edit Profile</h2>
      <p className='text-xl mt-5 mb-10 text-center'>Edit your {''}
        <span className='text-indigo-600 font-bold'>profile here</span>
      </p>

      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

          {alert.message && (
            <Alert alert={alert} />
          )}

          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label htmlFor='name' className='uppercase font-bold text-gray-600'>Name</label>
              <input className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                id='name'
                name='name'
                type='text'
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
              />
            </div>
            <div className='my-3'>
              <label htmlFor='web' className='uppercase font-bold text-gray-600'>Website</label>
              <input className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                id='web'
                name='web'
                type='text'
                value={profile.web || ''}
                onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
              />
            </div>
            <div className='my-3'>
              <label htmlFor='phone' className='uppercase font-bold text-gray-600'>Phone number</label>
              <input className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                id='phone'
                name='phone'
                type='text'
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
              />
            </div>
            <div className='my-3'>
              <label htmlFor='email' className='uppercase font-bold text-gray-600'>Email</label>
              <input className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                id='email'
                name='email'
                type='email'
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
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

export default EditProfile
