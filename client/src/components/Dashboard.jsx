import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import GradePredictor from "./GradePredictor.jsx";
import ListFriends from "./ListFriends.jsx";
import Graph from "./Graph.jsx";

function Dashboard() {

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

  

  return (
    <div>
    <div className="flex justify-center align-middle">
      <div className="mt-5 grid xl:grid-cols-2">
        <div className="max-w-[800px] mb-10"><Graph userData={userData}/></div>
        {/* Height of left block = 640px */}
        <div className="grid xl:grid-rows-[200px_440px]">
          <GradePredictor/>
          <ListFriends userData={userData}/>
        </div> 
      </div>
    </div> 

   </div>
  )
}

export default Dashboard