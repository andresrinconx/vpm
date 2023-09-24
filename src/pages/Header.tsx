import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { logOut } = useAuth()

  return (
    <header className='py-10 bg-indigo-600'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <h1 className='font-bold text-2xl text-indigo-200'>VPM - Manage your {''}
          <span className='text-white font-black'>pets</span>
        </h1>

        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
          <Link to='/admin' className='uppercase text-white text-sm'>Pets</Link>
          <Link to='/admin/profile' className='uppercase text-white text-sm font-bold'>Profile</Link>
          <button className='text-white text-sm uppercase font-bold' 
            type='button'
            onClick={() => logOut()}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
