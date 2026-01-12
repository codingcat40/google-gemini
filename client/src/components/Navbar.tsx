import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
    const {setUser, user, loading } = useAuth();

    if(loading) return null;

  const handleLogout = async (e: React.MouseEvent<HTMLLIElement>) => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate("/");
  };


  return (
    <nav className="sticky top-0 left-0 text-lg w-full flex items-center justify-end bg-black text-white shadow-2xl z-50 h-18">
      <ul className="flex flex-row gap-6 mr-6">
        <li>
          <Link to="/about" className="hover:text-gray-300 transition">
            About Me
          </Link>
        </li>
        {console.log("NAVBAR USER:", user)}
        {console.log("BOOLEAN(user):", Boolean(user))}
        {
          
        user && (
          <li
            className="cursor-pointer hover:text-red-400 transition"
            onClick={handleLogout}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
