
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex bg-white flex-col items-center justify-start  sm:pt-5 sm:p-10 h-screen  '>
      <Navbar/>
      <div className='flex justify-center items-center w-full bg-gray-200 bg-opacity-50 rounded-md  rounded-t-none shadow-xl h-[95vh] p-12 pt-5 max-w-screen-lg  '>

      <Outlet/>
      </div>
    </div>
  )
}

export default Layout
