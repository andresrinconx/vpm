import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import NewPassword from './pages/NewPassword'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './layout/ProtectedRoute'
import ManagePets from './pages/ManagePets'
import { PetsProvider } from './context/PetsProvider'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PetsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='forgot-password/:token' element={<NewPassword />} />
              <Route path='confirm/:id' element={<ConfirmAccount />} />
            </Route>

            <Route path='/admin' element={<ProtectedRoute />}>
              <Route index element={<ManagePets />} />
              <Route path='profile' element={<EditProfile />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
          </Routes>
        </PetsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App