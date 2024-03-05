import React, { Fragment, useState } from 'react'

import ListFriends from './ListFriends';


function friends() {

  const [searchUsername, setSearchUsername] = useState("");
  const [errorLabel, setErrorLabel] = useState("");

  const searchForFriends = async e => {
    //e.preventDefault();
    try {
      const body = { searchUsername };
      // console.log(searchUsername);
      const response = await fetch ("http://localhost:4000/friends/add", {
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
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Fragment>
      <h2 className=' text-xl'>Friends</h2>
      <label className="mt-5 text-red-600">{errorLabel}</label>
      <form className='flex mb-3' onSubmit={searchForFriends}>
        <input className='border-2 mr-2' value={searchUsername} onChange={e => setSearchUsername(e.target.value)}/>
        <button className='border-2 p-1'>Add Friend</button>
      </form>
      {/* <button className=" bg-yellow-400 mt-5"> View Friends</button> */}
      {/* In the friends table, each friend needs to have remove and view profile next to their name */}
      {/* I need tables for friends, outgoing requests, and incoming requests */}
      <ListFriends/>
    </Fragment>
  )
}

export default friends