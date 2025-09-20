import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const handleLogout = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

  }

  return (
    <div className='flex flex-row justify-end bg-black text-white min-h-12 shadow-2xl'>
        <ul className='flex flex-row gap-6 my-3 mx-6'>
             <Link to='/about'><li>About Me</li></Link>
             <li className='cursor-pointer' onClick={handleLogout}>Logout</li>
        </ul>
    </div>
  )
}

export default Navbar