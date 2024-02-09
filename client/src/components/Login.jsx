import { Link } from "react-router-dom"
import React, { useState } from "react"

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");

  const onSubmitForm = async e => {
    console.log("submitted")
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch ("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const responseData = await response.json();
      
      if (!response.ok) {
        setErrorLabel(responseData.error);
        throw Error(`Respose Status Code: ${response.status}`)
      }

      //window.location = "/login";
    } catch (err) {
      //console.error(err.message)
    }
  }

  return (
    <div className=" h-[calc(100vh-2.5rem)] flex bg-yellow flex-col justify-center items-center w-full">
        <h1 className="font-bold text-5xl">Login</h1>
        <label>{errorLabel}</label>
        <form className="mt-10 flex flex-col items-center" onSubmit={onSubmitForm}>
          <input className="border-2 p-1 w-60" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}></input><br/>
          <input className="border-2 p-1 w-60" placeholder="Password" type="password" value={password} onChange = {e => setPassword(e.target.value)}></input>
          <div className=" flex w-40 justify-around mt-5">
            <button className="bg-green-500 p-1 h-10">Sign In</button>
            <Link to="/signup">
              <button className="bg-amber-400 p-1 h-10">Sign Up</button>
            </Link>
          </div> 
        </form>       
    </div>
  )
}

export default Login