import { Link } from "react-router-dom"

function Login() {
  return (
    <div class=" h-[calc(100vh-2.5rem)] flex bg-yellow flex-col justify-center items-center w-full">
        <h1 class="font-bold text-5xl">Login</h1>
        <form class="mt-10 flex-col justify-center">
            <input class="border-2 p-1 w-60" placeholder="Email" type="email"></input><br/>
            <input class="border-2 mt-2 p-1 w-60" placeholder="Password" type="password"></input>
        </form>
        <div class=" flex  w-40 justify-around mt-5">
          <button class="bg-green-500 p-1 h-10">Sign In</button>
          <Link to="/signup">
            <button class="bg-amber-400 p-1 h-10">Sign Up</button>
          </Link>
        </div>        
    </div>
  )
}

export default Login