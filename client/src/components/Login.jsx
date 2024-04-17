import { Link } from "react-router-dom"
import React, { useState, useContext } from "react"

import { AuthContext } from '../context/AuthContext';

function Login() {

  const { setIsLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch ("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include"
      });
      if (!response.ok) {
        const responseData = await response.json();
        setErrorLabel(responseData.error);
        throw Error(`Respose Status Code: ${response.status}`)
      }
      window.location = "/dashboard";
      setIsLoggedIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className=" h-[calc(100vh-2.5rem)] flex bg-yellow flex-col justify-center items-center w-full">
        <h1 className="font-bold text-5xl">Login</h1>
        <label className="mt-5">{errorLabel}</label>
        <form className="mt-5 flex flex-col items-center" onSubmit={onSubmitForm}>
          <input className="border-2 p-1 w-96" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}></input><br/>
          <input className="border-2 p-1 w-96" placeholder="Password" type="password" value={password} onChange = {e => setPassword(e.target.value)}></input>
          <div className=" flex w-72 justify-around mt-5">
            <button className="bg-green-500 p-3 h-10 w-28 text-white font-bold leading-4">Sign In</button>
            <Link to="/signup">
              <button className="bg-amber-400 p-3 h-10 w-28 text-white font-bold leading-4">Sign Up</button>
            </Link>
          </div> 
        </form>       
    </div>
  )
}

export default Login