

function Login() {
  return (
    <div class="h-[calc(100vh-2.5rem)] flex bg-yellow justify-center items-center">
      <div>
        <h1 class="text-green-600 font-bold text-xl">Welcome</h1>
        <form>
          <label for="username">Username</label><br/>
          <input class="border-2" type="email" id="username"></input><br/>
          <label for="password">Password</label><br/>
          <input class="border-2" type="password" id="password"></input>
        </form>
        <button class="bg-amber-400 p-1 h-10">Sign In</button>
      </div>
    </div>
  )
}

export default Login