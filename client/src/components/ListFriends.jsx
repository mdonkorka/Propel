import React, { useEffect, useState, Fragment } from 'react'

import eye_icon from '../assets/eye_icon.png'
import cross_icon from '../assets/cross_icon.png'
import tick_icon from '../assets/tick_icon.png'
import graph from './Graph'

function ListFriends({userData}) {

  const [friends, setFriends] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const [incoming, setIncoming] = useState([])
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [graphData, setGraphData] = useState([]); // State for modal visibility
  const [topThreeApps, setTopThreeApps] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [errorLabel, setErrorLabel] = useState("");
  const [currentList, setCurrentList] = useState(true);
  const [incomingList, setIncomingList] = useState(false);
  const [outgoingList, setOutgoingList] = useState(false);
  const [profileUsername, setProfileUsername] = useState('');
  const [friendData, setFriendData] = useState('');

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

  const viewProfile = async (index, e) => {
    // e.preventDefault();
    try {
      const userId = friends[index].userid2;
      const url = `http://localhost:4000/friends/topthreeapps?userId=${userId}`

      const res = await fetch (url, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      });
      //window.location.reload();
      let response = await res.json();
      //console.log("res", response)
      const responseRefined = response.map((row) => {
        row = row.row.slice(1, -1);
        row = row.replace(/"/g, '')
        return row.split(',');
      })
      console.log(responseRefined)

      if (responseRefined.length < 3) {
        setTopThreeApps(false)
      } else {
        setTopThreeApps(responseRefined) 
      }

    } catch (err) {
      console.log(err)
    }

    document.body.classList.add('overflow-hidden');

    if (!userData ) {
      return <div>Loading user data...</div>;
    }

    //Show dual bar plot graph comparing friend and user data. Format:
    //{group: attendance, friend:20, user:28}
    //{group: faliures, friend:10, user:5}
    const gData = []
    const username = friends[index].username;
    setProfileUsername(username)
    const friendData = userData["friendsData"].filter((friend) => friend.username === username)[0];
    const usersData = userData["usersData"];

    if (friendData) {
    gData.push({"group": "absences", "friendScore": friendData["absences"], "userScore": usersData["absences"]});
    gData.push({"group": "attendance", "friendScore": friendData["attendance"], "userScore": usersData["attendance"]});
    gData.push({"group": "faliures", "friendScore": friendData["faliures"], "userScore": usersData["faliures"]});
    gData.push({"group": "lastgrade", "friendScore": friendData["lastgrade"], "userScore": usersData["lastgrade"]});
    gData.push({"group": "studytime", "friendScore": friendData["studytime"], "userScore": usersData["studytime"]});
    setGraphData(gData);
    }
    else {
      setGraphData(false)
    }
    setModalOpen(true); // Open modal

    // update(graphData);

    // Show friends top three apps
  };

  useEffect(() => {
    if (graphData) {
    update(graphData);
    }
  }, [modalOpen])

  // if(modalOpen === true) {
  //   update(graphData);
  // }

  const closeModal = () => {
    setModalOpen(false); // Close modal
    document.body.classList.remove('overflow-hidden');
  };

  const update = (data) => {

    // Clear the contents of the #profilegraph div
    d3.select("#profilegraph").html("");

    var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 650 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#profilegraph")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    var subgroups = ['friendScore', 'userScore']
    var groups = d3.map(data, function(d){return(d.group)}).keys()
    // console.log("groups", groups, subgroups)
    //groups banana, poacee, etc. , subgroups nitrogen, normal, etc.
    // console.log(data)

    // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0));

    var maxValue = d3.max(data, function(d) { 
      return d3.max(subgroups, function(key) { 
        return +d[key]; // Convert to number
      });
    });

     // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, maxValue])
    .range([height, 0]);

    svg.append("g")
    .call(d3.axisLeft(y));
    svg.selectAll(".tick text").attr("font-size", "16px");

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])
    
    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#ff9933', '#377eb8'])

    // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", 30)
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });
  }

  const selectFriendList = (selection) => {
    if (selection==='currentList') {
      setCurrentList(true)
      setIncomingList(false)
      setOutgoingList(false)
    }
    if (selection==='incomingList') {
      setCurrentList(false)
      setIncomingList(true)
      setOutgoingList(false)
    }
    if (selection==='outgoingList') {
      setCurrentList(false)
      setIncomingList(false)
      setOutgoingList(true)
    }
  }

  return (
    <div>

      {modalOpen && 
      <div id="myModal" onClick={closeModal} className="flex justify-center items-center fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
        <div className="bg-white px-10 py-5 border border-gray-300 w-full max-w-3xl relative mt-20 mb-5">
          <button className='right-5 absolute border-2 py-2 px-3 rounded-xl font-extrabold bg-red-600 text-white' onClick={closeModal}>X</button>
          <h2 className='top-3 end-2.5 text-6xl mb-5 text-center'>{profileUsername}</h2>

          {graphData ? ( <div><div className='flex right-3'>
            <div className='w-5 h-5 bg-orange-400 mb-1 ml-10'></div>
            <span className='ml-2'> - {profileUsername}</span>
            <div className='w-5 h-5 bg-sky-700 mb-5 ml-5'></div>
            <span className='ml-2'> - You</span>
          </div>
          <div className='mb-5'></div>
          <div id='profilegraph'></div></div>
          ) : (
            <h2 className='text-center mt-10 text-red-600 text-3xl font-semibold'>Profile Data Unsubmitted</h2>
          )}

          {topThreeApps ? (
            <div className='mt-5 rounded-xl border-2 py-2 text-center'>
              <h3 className='text-center text-2xl font-bold mb-2'>Top Three Apps</h3>
              <table className='mx-auto'>
                <thead>
                  <tr>
                    <th className='px-6 py-1'>App Name</th>
                    <th className='px-6 py-1 w-64'>Use Case</th>
                    <th className='px-6 py-1'>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {topThreeApps.map((row, index) => (
                    <tr key={index}>
                      <td className='px-6 py-1'>{row[0]}</td>
                      <td className='px-6 py-1 w-52'>{row[1]}</td>
                      <td className='px-6 py-1 text-blue-600'><a href={row[2]}>{row[2]}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className='text-center mt-10 text-red-600 text-3xl font-semibold'>Top Three Apps Unsubmitted</h2>
          )}
        </div>
      </div>
      }

      <h2 className='text-3xl mb-3 text-center'>Friends</h2>
      <label className="mt-5 text-red-600">{errorLabel}</label>
      <form className='flex mb-3 px-32' onSubmit={searchForFriends}>
        <input className='border-2 mr-2 grow' value={searchUsername} onChange={e => setSearchUsername(e.target.value)}/>
        <button className='border-2 p-1'>Add Friend</button>
      </form>

      <div className='flex justify-center mt-10 mb-5'>
      {/* <button className={`dataBtn mr-2 text-xl border-2 py-1 px-2 rounded-xl font-semibold ${selectedButton === 'attendance' ? 'bg-cyan-500 text-white' : ''}`} onClick={() => selectButton('attendance')}>attendance</button> */}

        <button className={`dataBtn mr-2 text-xl border-2 py-1 px-2 rounded-xl font-semibold  ${currentList ? 'bg-cyan-500 text-white' : ''}`} onClick={() => selectFriendList('currentList')}>Current</button>
        <button className={`dataBtn mr-2 text-xl border-2 py-1 px-2 rounded-xl font-semibold  ${incomingList ? 'bg-cyan-500 text-white' : ''}`} onClick={() => selectFriendList('incomingList')}>Incoming</button>
        <button className={`dataBtn mr-2 text-xl border-2 py-1 px-2 rounded-xl font-semibold  ${outgoingList ? 'bg-cyan-500 text-white' : ''}`} onClick={() => selectFriendList('outgoingList')}>Outgoing</button>
      </div>

      {currentList &&<div className='overflow-y-auto max-h-80'> <table className='mx-auto'>
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
              <td className='px-6 py-1 flex justify-center'>
                <button className='p-1' onClick={(e) => viewProfile(index, e)}>
                  <img src={eye_icon} className=' w-7 mx-auto'></img>
                </button>
              </td>
              <td className='px-6 py-1 text-center'>
                <button className='p-1' onClick={(e) => removeFriend(index, e)}>
                  <img src={cross_icon} className='w-7 mx-auto'></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> </div>}

      {incomingList && <table className='mx-auto overflow-y-auto max-h-80'>
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
                <button className='p-1 text-center' onClick={(e) => acceptIncomingRequest(index, e)}>
                  <img src={tick_icon} className='w-10 mx-auto'></img>
                </button>
              </td>
              <td className='px-6 py-1'>
                <button className='p-1 text-center' onClick={(e) => removeFriend(index, e)}>
                <img src={cross_icon} className='w-10 mx-auto'></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}

      {outgoingList && <table className='mx-auto overflow-y-auto max-h-80'>
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
                <button className='p-1 text-center' onClick={(e) => removeFriend(index, e)}>
                <img src={cross_icon} className='w-10 mx-auto'></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
  </div>
  )
}

export default ListFriends