import { PetInterface } from '../context/PetsProvider'
import usePets from '../hooks/usePets'

const Pet = ({ pet }: { pet: PetInterface }) => {
  const { email, name, owner, symptoms, date, _id } = pet as any

  const { editPet, deletePet } = usePets()

  const formatDate = (date: string) => {
    const newDate = new Date(date)
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(newDate)
  }

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
      <p className='font-bold uppercase text-gray-500'>Name: {''}
        <span className='font-normal normal-case text-black'>{name}</span>
      </p>
      <p className='font-bold uppercase text-gray-500'>Owner: {''}
        <span className='font-normal normal-case text-black'>{owner}</span>
      </p>
      <p className='font-bold uppercase text-gray-500'>Email: {''}
        <span className='font-normal normal-case text-black'>{email}</span>
      </p>
      <p className='font-bold uppercase text-gray-500'>Date: {''}
        <span className='font-normal normal-case text-black'>{formatDate(date)}</span>
      </p>
      <p className='font-bold uppercase text-gray-500'>Symptoms: {''}
        <span className='font-normal normal-case text-black'>{symptoms}</span>
      </p>

      <div className='flex justify-between my-5'>
        <button className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
          type='button'
          onClick={() => editPet(pet)}
        >
          Edit
        </button>

        <button className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
          type='button'
          onClick={() => deletePet(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Pet
