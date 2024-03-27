import React, { Fragment, useState, useEffect } from 'react'

import CompareTable from './compareTable';

function graph() {

  const [selectedButton, setSelectedButton] = useState('attendance');
  const [friendsData, setFriendsData] = useState(null);

  useEffect( () => {
    getData();
  }, [])

  const getData = async () => {
    // console.log("getting data");
    try {
      const userData = await fetch ("http://localhost:4000/graph/getdata", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });

      const friendsData = await userData.json();
      setFriendsData(friendsData);

      //For each academic data field (e.g. attendance), we need to get the user score, mean average, lowest, and highest
      //1. For each category, map the questionnaire data, taking the username, and score
      //I need two seperate lists: 
      //  - a ordered one for the list under the graph
      //  - for the graph, an object with the average, lowest, highest, user score, in this form:
            //   var data1 = [
            //     {group: "A", value: 4},
            //     {group: "B", value: 16},
            //     {group: "C", value: 8}
            // ];
      
      //Note: Make sure the user grabs their own data and not just their friends

      console.log(friendsData);
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <h2 className='text-xl'>Graph</h2>
      <div className="flex">
        <button className={`dataBtn mr-2 ${selectedButton === 'attendance' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('attendance')}>attendance</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'faliures' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('faliures')}>faliures</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'study time' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('study time')}>study time</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'absences' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('absences')}>absences</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'last grade' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('last grade')}>last grade</button>
      </div>
      <CompareTable selectedButton={selectedButton} friendsData={friendsData}/>
    </Fragment>
  )
}

export default graph