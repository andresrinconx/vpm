import { useState } from 'react'
import Form from "../components/Form"
import PetsList from "../components/PetsList"

const ManagePets = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='flex flex-col md:flex-row'>
      <button className='bg-indigo-600 text-white uppercase font-bold mx-10 p-3 rounded-md mb-10 md:hidden'
        type='button'
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Close Form' : 'Show form'}
      </button>
      <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Form />
      </div>

      <div className='md:w-1/2 lg:w-3/5'>
        <PetsList />
      </div>
    </div>
  )
}

export default ManagePets
