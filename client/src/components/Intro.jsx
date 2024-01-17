import { Link } from "react-router-dom"

function Intro() {
  return (
    <div class="h-[calc(100vh-2.5rem)] flex bg-yellow justify-center items-center">
      <div class="flex flex-col justify-center items-center mt-[-50px]">
        <h1 class="text-cyan-500 font-bold text-6xl">Propel</h1>
        <span class="mt-5">A Social Media Web App for Academics</span>
        <Link to="/login" class="mt-5">
          <label class="text-xl bg-green-500 text-white font-semibold px-5 py-1 rounded hover:bg-green-900">Login</label>
        </Link>
      </div>
    </div>
  )
}

export default Intro