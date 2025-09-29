import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const handleLogout = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

  }

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-end bg-black text-white shadow-2xl z-50 h-14">
  <ul className="flex flex-row gap-6 mr-6">
    <li>
      <Link to="/about" className="hover:text-gray-300 transition">
        About Me
      </Link>
    </li>
    <li
      className="cursor-pointer hover:text-red-400 transition"
      onClick={handleLogout}
    >
      Logout
    </li>
  </ul>
</nav>



  )
}

export default Navbar