import usePets from '../hooks/usePets'
import Pet from './Pet'

const PetsList = () => {
  const { pets } = usePets()

  return (
    <>
      {pets.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Pets List</h2>
          <p className='text-xl mt-5 mb-10 text-center'>Manage your {''}
            <span className='text-indigo-600 font-bold'>pets and appointments</span>
          </p>

          {pets.map(pet => (
            <Pet 
              pet={pet} 
              key={pet._id}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>You don't have any pets</h2>
          <p className='text-xl mt-5 mb-10 text-center'>Start adding your pets {''}
            <span className='text-indigo-600 font-bold'>and manage them here</span>
          </p>
        </>
      )}
    </>
  )
}

export default PetsList
