import axios from 'axios'
import { PetInterface } from '../context/PetsProvider'

// -----------------------------------------------
// ENDPOINTS
// -----------------------------------------------

const apiBaseUrl = import.meta.env.VITE_API_URL

// Vets
const registerVetEndpoint = () => `${apiBaseUrl}/vets`
const confirmVetEndpoint = (id: string | undefined) => `${apiBaseUrl}/vets/confirm/${id}`
const forgotPasswordEndpoint = () => `${apiBaseUrl}/vets/forgot-password`
const newPasswordEndpoint = (token: string | undefined) => `${apiBaseUrl}/vets/forgot-password/${token}`
const resetPasswordEndpoint = (token: string | undefined) => `${apiBaseUrl}/vets/forgot-password/${token}`
const logInEndpoint = () => `${apiBaseUrl}/vets/login`
const getProfileEndpoint = () => `${apiBaseUrl}/vets/profile`
const updateProfileEndpoint = (id: string) => `${apiBaseUrl}/vets/profile/${id}`
const updatePasswordEndpoint = () => `${apiBaseUrl}/vets/update-password`

// Clients
const saveClientEndpoint = () => `${apiBaseUrl}/clients`
const getClientsEndpoint = () => `${apiBaseUrl}/clients`
const updateClientEndpoint = (id: string) => `${apiBaseUrl}/clients/${id}`
const deleteClientEndpoint = (id: string) => `${apiBaseUrl}/clients/${id}`

// -----------------------------------------------
// API CALL
// -----------------------------------------------

const apiCall = async (endpoint: string, method: Uppercase<string>, data?: any, headers?: Record<string, string>)=>{
  try {
    const res = await axios.request({
      url: endpoint,
      method,
      data: data ? data : { },
      headers: headers ? headers : { }
    })
    return res?.data
  } catch(error) {
    throw new Error(error?.response?.data?.msg)
  }
}

// -----------------------------------------------
// FUNCTIONS
// -----------------------------------------------

// Vets
export const fetchRegisterVet = (vet: { name: string, email: string, password: string }) => {
  return apiCall(registerVetEndpoint(), 'POST', vet)
}
export const fetchConfirmVet = (id: string | undefined) => {
  return apiCall(confirmVetEndpoint(id), 'GET')
}
export const fetchForgotPassword = (email: string) => {
  return apiCall(forgotPasswordEndpoint(), 'POST', { email })
}
export const fetchNewPassword = (token: string | undefined) => {
  return apiCall(newPasswordEndpoint(token), 'GET')
}
export const fetchResetPassword = (token: string | undefined, password: string) => {
  return apiCall(resetPasswordEndpoint(token), 'POST', { password })
}
export const fetchLogIn = (email: string, password: string) => {
  return apiCall(logInEndpoint(), 'POST', { email, password })
}
export const fetchProfile = (headers: { }) => {
  return apiCall(getProfileEndpoint(), 'GET', { }, headers) 
}
export const fetchUpdatePassword = (passwords: {password: string, password2: string}, headers: { }) => {
  return apiCall(updatePasswordEndpoint(), 'PUT', passwords, headers)
}

// Clients
export const fetchSaveClient = (pet: PetInterface, headers: { }) => {
  return apiCall(saveClientEndpoint(), 'POST', pet, headers)
}
export const fetchGetClients = (headers: { }) => {
  return apiCall(getClientsEndpoint(), 'GET', { }, headers)
}
export const fetchUpdateClient = (id: string, pet: PetInterface, headers: { }) => {
  return apiCall(updateClientEndpoint(id), 'PUT', pet, headers)
}
export const fetchDeleteClient = (id: string, headers: { }) => {
  return apiCall(deleteClientEndpoint(id), 'DELETE', { }, headers)
}
export const fetchUpdateProfile = (id: string, vet: { name: string, email: string, web: string, phone: string }, headers: { }) => {
  return apiCall(updateProfileEndpoint(id), 'PUT', vet, headers)
}