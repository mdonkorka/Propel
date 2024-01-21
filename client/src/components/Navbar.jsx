import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-black h-10 fixed w-full">
      <Link to="/">
        <label className="text-2xl text-cyan-500 ml-3 font-bold cursor-pointer">Propel</label>
      </Link>
    </nav>
  )

}

export default Navbar