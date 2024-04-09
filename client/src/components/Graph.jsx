import React, { Fragment, useState, useEffect, useRef } from 'react'

import CompareTable from './compareTable';

function graph({userData}) {

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const [selectedButton, setSelectedButton] = useState('attendance');
  const [updatedGraphData, setUpdatedGraphData] = useState({});

  useEffect( () => {
    getData();
  }, [])

  const getData = async () => {
      const graphData = {"attendance": [],
                    "faliures": [],
                    "studytime": [],
                    "absences": [],
                    "lastgrade": [],
      }

      for (let attribute in graphData) { //loops throguh the keys
        let userScore =  (userData["usersData"][attribute])
        //get the highest and lowest value in the user data, then add it to graphData
        let highestVal = Math.max(userScore, ...userData["friendsData"].map(data => data[attribute]));
        let lowestVal = Math.min(userScore, ...userData["friendsData"].map(data => data[attribute]));
        graphData[attribute].push({group: "highest value", value: highestVal})
        graphData[attribute].push({group: "lowest value", value: lowestVal})
        //get the mean value in user data and add it to graphData
        let total = userData["friendsData"].reduce((acc, current) => {
          return acc + parseInt(current[attribute]);
        }, 0);
        total += parseInt(userScore)
        graphData[attribute].push({group: "mean", value: (total / (userData["friendsData"].length + 1)).toFixed(2)})
        //add the user score to graphData
        graphData[attribute].push({group: "user score", value: userScore})
      }
      // console.log(userData);
      // console.log(graphData)

      setUpdatedGraphData(graphData);
      update(graphData[selectedButton])
  }

  const selectButton = (button) => {
    setSelectedButton(button)
    if (button === 'attendance') {
      update(updatedGraphData["attendance"])
    } else if (button === 'faliures') {
      update(updatedGraphData["faliures"])
    } else if (button === 'studytime') {
      update(updatedGraphData["studytime"])
    } else if (button === 'absences') {
      update(updatedGraphData["absences"])
    } else if (button === 'lastgrade') {
      update(updatedGraphData["lastgrade"])
    }
  }

  const update = (data) => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#graph").html("")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(function (d) { return d.group; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return d.value; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    const u = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.group); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.value); })
      .attr("fill", "#69b3a2");
  };

  return (
    <Fragment>
      <h2 className='text-xl'>Graph</h2>
      <div className="flex">
        <button className={`dataBtn mr-2 ${selectedButton === 'attendance' ? 'bg-cyan-500' : ''}`} onClick={() => selectButton('attendance')}>attendance</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'faliures' ? 'bg-cyan-500' : ''}`} onClick={() => selectButton('faliures')}>faliures</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'studytime' ? 'bg-cyan-500' : ''}`} onClick={() => selectButton('studytime')}>study time</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'absences' ? 'bg-cyan-500' : ''}`} onClick={() => selectButton('absences')}>absences</button>
        <button className={`dataBtn mr-2 ${selectedButton === 'lastgrade' ? 'bg-cyan-500' : ''}`} onClick={() => selectButton('lastgrade')}>last grade</button>
      </div>
      <div id="graph"></div>
      <CompareTable selectedButton={selectedButton} friendsData={userData["friendsData"]} usersData={userData["usersData"]}/>
    </Fragment>
  )
}

export default graph