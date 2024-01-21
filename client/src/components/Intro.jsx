import { Link } from "react-router-dom"

function Intro() {
  return (
    <div className="h-[calc(100vh-2.5rem)] flex bg-yellow justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-[-50px]">
        <h1 className="text-cyan-500 font-bold text-6xl">Propel</h1>
        <span className="mt-5">A Social Media Web App for Academics</span>
        <Link to="/login" className="mt-5">
          <label className="text-xl bg-green-500 text-white font-semibold px-5 py-1 rounded hover:bg-green-900">Login</label>
        </Link>
      </div>
    </div>
  )
}

export default Intro