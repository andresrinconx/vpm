import { createContext, useState, useEffect } from 'react'
import { fetchDeleteClient, fetchGetClients, fetchSaveClient, fetchUpdateClient } from '../utils/api'

export interface PetInterface {
  name: string
  owner: string
  email: string
  date: string
  symptoms: string
  id: string
}

const PetsContext = createContext<{
  pets: any[]
  savePet: (pet: PetInterface) => void
  editPet: (pet: PetInterface) => void
  pet: PetInterface
  deletePet: (id: string) => void
}>({
  pets: [],
  savePet: () => { },
  editPet: () => { },
  pet: {
    name: '',
    owner: '',
    email: '',
    date: '',
    symptoms: '',
    id: ''
  },
  deletePet: () => { }
})

export const PetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pets, setPets] = useState<PetInterface[]>([])
  const [pet, setPet] = useState<PetInterface>({
    name: '',
    owner: '',
    email: '',
    date: '',
    symptoms: '',
    id: ''
  })

  useEffect(() => {
    const getPets = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetchGetClients({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        })
        setPets(res)
      } catch (error) {
        console.log(error)
      }
    }
    getPets()
  }, [])

  const savePet = async (pet: PetInterface) => {
    const token = localStorage.getItem('token')

    if (pet.id) {
      // update
      try {
        const res = await fetchUpdateClient(pet.id, pet, {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        })
        const updatedPets = pets.map((pet: any) => pet._id === res.updatedClient._id ? res.updatedClient : pet)
        setPets(updatedPets)
        setPet({
          name: '',
          owner: '',
          email: '',
          date: '',
          symptoms: '',
          id: ''
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      // create
      try {
        const res = await fetchSaveClient(pet, {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        })
        const { createdAt, updatedAt, __v, ...savedPet } = res.savedClient
        setPets([savedPet, ...pets])
      } catch (error) {
        console.log(error)
      }
    }
  }

  const editPet = (pet: PetInterface) => {
    setPet(pet)
  }

  const deletePet = async (id: string) => {
    try {
      const token = localStorage.getItem('token')

      await fetchDeleteClient(id, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })
      const updatedPets = pets.filter((pet: any) => pet._id !== id)
      setPets(updatedPets)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <PetsContext.Provider value={{
      pets,
      savePet,
      editPet,
      pet,
      deletePet
    }}>
      {children}
    </PetsContext.Provider>
  )
}

export default PetsContext