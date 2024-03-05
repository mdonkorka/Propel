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
      //console.log(incoming)
    } catch (err) {
      console.log(err);
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
                <button className='border-2 p-1 text-center'>Remove Friend</button>
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
                <button className=' border-2 p-1 text-center'>Accept</button>
              </td>
              <td className='px-6 py-1'>
                <button className='border-2 p-1 text-center'>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th className='px-6 py-1 w-52'>Incoming Request</th>
            <th className='px-6 py-1'>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {outgoing.map((friend, index) => (
            <tr key={index}>
              <td className='px-6 py-1 text-center'>{friend.username}</td>
              <td className='px-6 py-1'>
                <button className=' border-2 p-1 text-center'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </Fragment>
  )
}

export default ListFriends