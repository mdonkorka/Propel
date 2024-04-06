import React, { Fragment, useState, useEffect } from 'react'

import ListFriends from './ListFriends';
import Graph from './Graph';


function friends() {

  const [searchUsername, setSearchUsername] = useState("");
  const [errorLabel, setErrorLabel] = useState("");
  const [userData, setuserData] = useState(null);

  useEffect( () => {
    getData();
  }, [])

  const getData = async () => {
    // console.log("getting data");
    try {
      const fetchedUserData = await fetch ("http://localhost:4000/graph/getdata", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });

      const fetchedData = await fetchedUserData.json();
      setuserData(fetchedData);

    } catch (err) {
      console.log(err);
    }
  }

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

  //A modal needs to be created for view profile. 
  //userData will contain the data needed to create a graph

  return (
    <Fragment>
      <h2 className=' text-xl'>Friends</h2>
      <label className="mt-5 text-red-600">{errorLabel}</label>
      <form className='flex mb-3' onSubmit={searchForFriends}>
        <input className='border-2 mr-2' value={searchUsername} onChange={e => setSearchUsername(e.target.value)}/>
        <button className='border-2 p-1'>Add Friend</button>
      </form>
      <ListFriends/>
      <Graph userData={userData}/>
    </Fragment>
  )
}

export default friends