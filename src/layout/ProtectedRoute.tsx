import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

const ProtectedRoute = () => {
  const { auth, loading } = useAuth() as any

  if (loading) return <h1>Loading...</h1>
  return (
    <>
      <Header />
        {auth?._id ? (
          <main className='container mx-auto mt-10'>
            <Outlet />
          </main>
        ) : <Navigate to='/' />}
      <Footer />
    </>
  )
}

export default ProtectedRoute
