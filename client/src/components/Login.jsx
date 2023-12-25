

function Login() {
  return (
    <div>
      <form>
        <label for="username">Username</label><br/>
        <input class="border-2" type="email" id="username"></input><br/>
        <label for="password">Password</label><br/>
        <input class="border-2" type="password" id="password"></input>
      </form>
      <button class="bg-amber-400 p-1">Sign In</button>

      
    </div>
  )
}

export default Login