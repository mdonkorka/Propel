import React, { useEffect, useState, Fragment } from 'react'

function ListFriends({userData}) {

  const [friends, setFriends] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const [incoming, setIncoming] = useState([])
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [graphData, setGraphData] = useState([]); // State for modal visibility
  const [topThreeApps, setTopThreeApps] = useState([]);

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
      setTopThreeApps(responseRefined)

    } catch (err) {
      console.log(err)
    }


    
    document.body.classList.add('overflow-hidden');

    if (!userData) {
      return <div>Loading user data...</div>;
    }

    //Show dual bar plot graph comparing friend and user data. Format:
    //{group: attendance, friend:20, user:28}
    //{group: faliures, friend:10, user:5}
    const graphData = []
    const username = friends[index].username;
    const friendData = userData["friendsData"].filter((friend) => friend.username === username)[0];
    const usersData = userData["usersData"];

    graphData.push({"group": "absences", "friendScore": friendData["absences"], "userScore": usersData["absences"]});
    graphData.push({"group": "attendance", "friendScore": friendData["attendance"], "userScore": usersData["attendance"]});
    graphData.push({"group": "faliures", "friendScore": friendData["faliures"], "userScore": usersData["faliures"]});
    graphData.push({"group": "lastgrade", "friendScore": friendData["lastgrade"], "userScore": usersData["lastgrade"]});
    graphData.push({"group": "studytime", "friendScore": friendData["studytime"], "userScore": usersData["studytime"]});
    console.log(graphData);

    setGraphData(graphData);

    setModalOpen(true); // Open modal

    // update(graphData);

    // Show friends top three apps
  };

  useEffect(() => {
    update(graphData);
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
    width = 460 - margin.left - margin.right,
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

     // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 40])
      .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])
    
    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#e41a1c', '#377eb8'])

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
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });
  }

  return (
    <Fragment>

      {modalOpen && 
      <div id="myModal" onClick={closeModal} className="flex justify-center items-center fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
        <div className="bg-white mx-auto p-20 border border-gray-300 w-1/2 h-4/6">
          Modal <br/>
          <button onClick={closeModal}>X</button>
          <div id='profilegraph'></div>
          <table>
            <thead>
              <tr>
              <th className='px-6 py-1'>App Name</th>
              <th className='px-6 py-1 w-64'>Use Case</th>
              <th className='px-6 py-1'>Link</th>
              </tr>
            </thead>
            <tbody>
                {topThreeApps.map((row) => (
                  <tr>
                    <td className='px-6 py-1'>{row[0]}</td>
                    <td className='px-6 py-1 w-52'>{row[1]}</td>
                    <td className='px-6 py-1'>{row[2]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      }
      

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
                <button className=' border-2 p-1 text-center' onClick={(e) => viewProfile(index, e)}>View Profile</button>
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