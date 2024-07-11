
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex bg-white flex-col items-center justify-start space-y-2 sm:pt-5 sm:p-10  '>
      <Navbar/>
      <div className='flex justify-center items-center w-full bg-gray-100 bg-opacity-50 rounded-md shadow-xl h-[35rem] pt-10'>

      <Outlet/>
      </div>
    </div>
  )
}

export default Layout
