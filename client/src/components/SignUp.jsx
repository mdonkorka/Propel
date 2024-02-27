import React, { useState } from "react"

function SignUp() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [errorLabel, setErrorLabel] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      console.log("trying")
      const body = { email, username, firstname, lastname, password };
      const response = await fetch ("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const responseData = await response.json();
      if (!response.ok) {
        setErrorLabel(responseData.error);
        throw Error(`Respose Status Code: ${response.status}`)
      }

      window.location = "/login";
    } catch (err) {
      //console.error(err.message)
    }
  }

  return (
    <div className=" h-[calc(100vh-2.5rem)] flex bg-yellow flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-5xl">Sign Up</h1>
        <form className="flex flex-col justify-center items-center mt-10" onSubmit={onSubmitForm}>
          <label className="mt-5">{errorLabel}</label>
          <input className="border-2 mt-2 w-80 p-1" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email"></input><br/>
          <input className="border-2 mt-2 w-80 p-1" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" type="text"></input><br/>
          <input className="border-2 mt-2 w-80 p-1" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="Firstname" type="text"></input><br/>
          <input className="border-2 mt-2 w-80 p-1" value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Lastname" type="text"></input><br/>
          <input className="border-2 mt-2 w-80 p-1" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"></input>
          <button className="bg-amber-400 p-1 h-10 mt-5 w-20">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp