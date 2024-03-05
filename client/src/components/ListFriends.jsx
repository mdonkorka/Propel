import React, { useEffect, useState, Fragment } from 'react'

function ListFriends() {

  const [friends, setFriends] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const [incoming, setIncoming] = useState([])

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const userData = await fetch ("http://localhost:4000/friends/getData", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });
      const friendsData = await userData.json();

      const friendsList = friendsData.filter(relation => relation.type === 'friends')
      setFriends(friendsList)
      const outgoingList = friendsData.filter(relation => relation.type === 'outgoing')
      setOutgoing(outgoingList)
      const incomingList = friendsData.filter(relation => relation.type === 'incoming')
      setIncoming(incomingList)
      
    } catch (err) {
      console.log(err);
    }
  } 

  const deleteOutgoingRequest = async (index, e) => {
    e.preventDefault();
    try {
      const otherUserId = outgoing[index].userid2;
      const body = { otherUserId }

      const response = await fetch ("http://localhost:4000/friends/deleteOutgoingRequest", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include"
      });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const acceptIncomingRequest = async (index, e) => {
    e.preventDefault();
    try {
      const otherUserId = incoming[index].userid2;
      const body = { otherUserId }
      console.log(body)

      const response = await fetch ("http://localhost:4000/friends/acceptIncomingRequest", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include"
      });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const rejectIncomingRequest = async (index, e) => {
    e.preventDefault();
    try {
      const otherUserId = incoming[index].userid2;
      const body = { otherUserId }
      console.log(body)

      const response = await fetch ("http://localhost:4000/friends/rejectIncomingRequest", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include"
      });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const removeFriend = async (index, e) => {
    e.preventDefault();
    try {
      const otherUserId = friends[index].userid2;
      const body = { otherUserId }
      console.log(body)

      const response = await fetch ("http://localhost:4000/friends/removeFriend", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include"
      });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th className='px-6 py-1 w-52'>Freinds</th>
            <th className='px-6 py-1'> View Profile</th>
            <th className='px-6 py-1'>Delete Friend</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => (
            <tr key={index}>
              <td className='px-6 py-1 text-center'>{friend.username}</td>
              <td className='px-6 py-1'>
                <button className=' border-2 p-1 text-center'>View Profile</button>
              </td>
              <td className='px-6 py-1'>
                <button className='border-2 p-1 text-center' onClick={(e) => removeFriend(index, e)}>Remove Friend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th className='px-6 py-1 w-52'>Incoming Request</th>
            <th className='px-6 py-1'>Accept</th>
            <th className='px-6 py-1'>Reject</th>
          </tr>
        </thead>
        <tbody>
          {incoming.map((friend, index) => (
            <tr key={index}>
              <td className='px-6 py-1 text-center'>{friend.username}</td>
              <td className='px-6 py-1'>
                <button className=' border-2 p-1 text-center' onClick={(e) => acceptIncomingRequest(index, e)}>Accept</button>
              </td>
              <td className='px-6 py-1'>
                <button className='border-2 p-1 text-center' onClick={(e) => rejectIncomingRequest(index, e)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th className='px-6 py-1 w-52'>Outgoing Request</th>
            <th className='px-6 py-1'>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {outgoing.map((friend, index) => (
            <tr key={index}>
              <td className='px-6 py-1 text-center'>{friend.username}</td>
              <td className='px-6 py-1'>
                <button className=' border-2 p-1 text-center' onClick={(e) => deleteOutgoingRequest(index, e)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </Fragment>
  )
}

export default ListFriends