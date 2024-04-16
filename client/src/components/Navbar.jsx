import { Link } from "react-router-dom"

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
  } catch (err) {
    
  }
}

function Navbar() {
  return (
    <nav className="bg-black h-10 fixed w-full relative">
        <Link to="/">
          <label className="text-2xl text-cyan-500 ml-3 font-bold cursor-pointer">Propel</label>
        </Link>
        <Link to="/dashboard">
          <button className="text-white ml-5">Dashboard</button>
        </Link>
        <Link to="/questionnaire">
          <button className="text-white ml-5">Questionnaire</button>
        </Link>
        <button className="text-white p-1 h-10 absolute right-3" onClick={logout}>Logout</button>
    </nav>
  )

}

export default Navbar