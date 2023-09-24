import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchConfirmVet } from '../utils/api'
import Alert from '../components/Alert'

interface AlertProps {
  error?: boolean
  message?: string
}

const ConfirmAccount = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<AlertProps>({})
  
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const res = await fetchConfirmVet(id)
        setAlert({
          message: res?.msg,
        })
        setConfirmedAccount(true)
      } catch (error) {
        setAlert({
          message: error.message,
          error: true
        })
      }
  
      setLoading(false)
    }

    confirmAccount()
  }, [])

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirm your account and Manage your
          <span className='text-black'> Pets</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!loading && (
          <Alert
            alert={alert}
          />
        )}

        {confirmedAccount && (
          <Link className='block text-center my-5 text-gray-500' 
            to='/'>Log in
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount