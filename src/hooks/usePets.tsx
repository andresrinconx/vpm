import { useContext } from 'react'
import PetsContext from '../context/PetsProvider'

const usePets = () => {
  return useContext(PetsContext)
}

export default usePets