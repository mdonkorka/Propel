import React, { Fragment, useState, useEffect } from 'react'

import CompareTable from './compareTable';

function graph() {

  const [selectedButton, setSelectedButton] = useState('attendance');
  const [userData, setuserData] = useState(null);
  const [usersData, setusersData] = useState(null);

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

      const userData = await fetchedUserData.json();
      setuserData(userData["friendsData"]);
      setusersData(userData["usersData"]);

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
      
      
      const graphData = {"attendance": {},
                    "faliures": {},
                    "studytime": {},
                    "absences": {},
                    "lastgrade": {},
      }

      console.log(userData)

      for (let attribute in graphData) { //loops throguh the keys
        let userScore =  (userData["usersData"][attribute])
        //get the highest value in user data
        graphData[attribute]["highest value"] = userData["friendsData"].reduce((acc, current) => {  //acc stands for accumulator
          return acc[attribute] >= current[attribute] ? acc[attribute] : current[attribute]
        });
        if (userScore > graphData[attribute]["highest value"]) {
          graphData[attribute]["highest value"] = userScore;
        }
        //get the lowest value in user data
        graphData[attribute]["lowest value"] = userData["friendsData"].reduce((acc, current) => {
          return acc[attribute] <= current[attribute] ? acc[attribute] : current[attribute]
        });
        if (userScore < graphData[attribute]["lowest value"]) {
          graphData[attribute]["lowest value"] = userScore;
        }
        //get the mean value in user data
        let total = userData["friendsData"].reduce((acc, current) => {
          return acc + parseInt(current[attribute]);
        }, 0);
        total += parseInt(userScore)
        graphData[attribute]["mean"] = (total / (userData["friendsData"].length + 1)).toFixed(2)
        //get the users values
        // userData.filter((data) => data.userid = )
        graphData[attribute]["userScore"] = userScore
      }

      console.log(userData);
      console.log(graphData)
      
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
        <button className={`dataBtn mr-2 ${selectedButton === 'studytime' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('studytime')}>study time</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'absences' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('absences')}>absences</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'lastgrade' ? 'bg-cyan-500' : ''}`} onClick={() => setSelectedButton('lastgrade')}>last grade</button>
      </div>
      <CompareTable selectedButton={selectedButton} friendsData={userData} usersData={usersData}/>
    </Fragment>
  )
}

export default graph