import { useState, useEffect } from 'react'
import Alert from './Alert'
import usePets from '../hooks/usePets'

interface AlertProps {
  error?: boolean
  message?: string
}

const Form = () => {
  const [pet, setPet] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [id, setId] = useState('')

  const [alert, setAlert] = useState<AlertProps>({})
  const { savePet, pet: petProvider } = usePets() as any

  useEffect(() => {
    if (petProvider?.name) {
      setPet(petProvider.name)
      setOwner(petProvider.owner)
      setEmail(petProvider.email)
      setDate(petProvider.date)
      setSymptoms(petProvider.symptoms)
      setId(petProvider._id)
    }
  }, [petProvider])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // validation
    if ([pet, owner, email, date, symptoms].includes('')) {
      setAlert({
        error: true,
        message: 'All fields are required'
      })
      return
    }

    if (petProvider?.name) {
      savePet({ name: pet, owner, email, date, symptoms, id })
    } else {
      savePet({ name: pet, owner, email, date, symptoms,  })
    }
    setAlert({
      message: 'Pet saved successfully'
    })

    // reset values
    setPet('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
    setId('')
  }

  return (
    <>
      <h2 className='font-black text-3xl text-center'>Pets Manager</h2>
      <p className='text-xl mt-5 mb-10 text-center'>Add your pets and {''}
        <span className='text-indigo-600 font-bold'>manage them</span>
      </p>

      {alert.message && (
        <Alert alert={alert} />
      )}

      <form className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='pet' className='text-gray-700 uppercase font-bold'>Pet Name</label>
          <input className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='pet'
            placeholder='Pet Name'
            type='text'
            value={pet}
            onChange={e => setPet(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='owner' className='text-gray-700 uppercase font-bold'>Owner Name</label>
          <input className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='owner'
            placeholder='Owner Name'
            type='text'
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='text-gray-700 uppercase font-bold'>Email</label>
          <input className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='email'
            placeholder='Email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='date' className='text-gray-700 uppercase font-bold'>Date</label>
          <input className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='date'
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='symptoms' className='text-gray-700 uppercase font-bold'>Symptoms</label>
          <input className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='symptoms'
            placeholder='Symptoms'
            type='text'
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
          />
        </div>

        <input className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-colors cursor-pointer'
          type='submit'
          value={id ? 'Save changes' : 'Add Pet'}
        />
      </form>
    </>
  )
}

export default Form
