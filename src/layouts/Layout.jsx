
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex bg-gray-50 flex-col items-center justify-start space-y-2 sm:pt-10 sm:p-10 '>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout
