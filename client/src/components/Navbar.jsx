import { Link } from "react-router-dom"
import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext';

function Navbar() {

  // const [isLoggedIn, setIsLoogedIn] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const logout = async e => {
  
    e.preventDefault();
    try {
      const response = await fetch ("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });
      if (!response.ok) {
        throw Error(`Respose Status Code: ${response.status}`)
      }
      window.location = "/login";
      setIsLoggedIn(false);
    } catch (err) {
      
    }
  }
  
  return (
    <nav className="bg-black h-10 fixed w-full relative flex">
        <Link to="/">
          <label className="text-2xl text-cyan-500 ml-3 font-bold cursor-pointer">Propel</label>
        </Link>
        {isLoggedIn && <div>
          <Link to="/dashboard">
            <button className="text-white ml-5 mt-2">Dashboard</button>
          </Link>
          <Link to="/questionnaire">
            <button className="text-white ml-5">Questionnaire</button>
          </Link>
          <button className="text-white p-1 h-10 absolute right-3" onClick={logout}>Logout</button>
        </div>}
    </nav>
  )

}

export default Navbar