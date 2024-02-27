import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Questionnaire() {
  const [attendance, setAttendance] = useState("");
  const [absences, setAbsences] = useState("");
  const [faliures, setFaliures] = useState("")
  const [studytime, setStudyTime] = useState("");
  const [lastgrade, setLastGrade] = useState("");

  const [app1Name, setApp1Name] = useState("");
  const [app1UseCase, setApp1UseCase] = useState("");
  const [app1Link, setApp1Link] = useState("")

  const [app2Name, setApp2Name] = useState("");
  const [app2UseCase, setApp2UseCase] = useState("");
  const [app2Link, setApp2Link] = useState("")

  const [app3Name, setApp3Name] = useState("");
  const [app3UseCase, setApp3UseCase] = useState("");
  const [app3Link, setApp3Link] = useState("")

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { attendance, absences, faliures, studytime, lastgrade,
                    app1Name, app1UseCase, app1Link,
                    app2Name, app2UseCase, app2Link,
                    app3Name, app3UseCase, app3Link
       };
      const response = await fetch ("http://localhost:4000/questionnaire/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include",
      });
      location.reload();
      if (!response.ok) {
        throw Error(`Respose Status Code: ${response.status}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getData = async () => {
    try {
      const userData = await fetch ("http://localhost:4000/questionnaire/getData", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });
      const jsonData = await userData.json();

      const academicData = jsonData.academicData;
      const topThreeAppsData = jsonData.topThreeAppsData.rows;
      
      setAttendance(academicData.attendance);
      setAbsences(academicData.absences);
      setFaliures(academicData.faliures);
      setStudyTime(academicData.studytime);
      setLastGrade(academicData.lastgrade);

      for (let i=0; i<topThreeAppsData.length; i++) {
        if (1 == topThreeAppsData[i].number) {
          setApp1Name(topThreeAppsData[i].name);
          setApp1UseCase(topThreeAppsData[i].usecase);
          setApp1Link(topThreeAppsData[i].link);
        }
        if (2 == topThreeAppsData[i].number) {
          setApp2Name(topThreeAppsData[i].name);
          setApp2UseCase(topThreeAppsData[i].usecase);
          setApp2Link(topThreeAppsData[i].link);
        }
        if (3 == topThreeAppsData[i].number) {
          setApp3Name(topThreeAppsData[i].name);
          setApp3UseCase(topThreeAppsData[i].usecase);
          setApp3Link(topThreeAppsData[i].link);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <form className="flex flex-col" onSubmit={onSubmitForm}>
        <h2 className="mt-20 mb-5 font-bold text-xl">Your Academic Data</h2>
        <label>What is your atttendance?</label>
        <input className="border-2 p-1 w-200 w-96" type="text" value={attendance} onChange={e => setAttendance(e.target.value)}></input>
        <label className="mt-5" >How many absences do you have?</label>
        <input className="border-2 p-1 w-96" type="text" value={absences} onChange={e => setAbsences(e.target.value)}></input>
        <label className="mt-5">How many past faliures do you have?</label>
        <input className="border-2 p-1 w-96" type="text" value={faliures} onChange={e => setFaliures(e.target.value)}></input>
        <label className="mt-5">On Average, how long do you study each week?</label>
        <input className="border-2 p-1 w-96" type="text" value={studytime} onChange={e => setStudyTime(e.target.value)}></input>
        <label className="mt-5">What was your last grade (percentage)?</label>
        <input className="border-2 p-1 w-96" type="text" value={lastgrade} onChange={e => setLastGrade(e.target.value)}></input>
      
        <div className="flex flex-col">
          <h2 className="mt-10 mb-5 font-bold text-xl">Your Top Three Apps</h2>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label>App 1 Name</label>
              <input className="border-2 p-1 w-200 w-96" type="text" value={app1Name} onChange={e => setApp1Name(e.target.value)}></input>
            </div>
            <div className="flex flex-col ml-5">
              <label>Use Case</label>
              <input className="border-2 p-1 w-96" type="text" value={app1UseCase} onChange={e => setApp1UseCase(e.target.value)}></input>
            </div>
            <div className="flex flex-col ml-5">
              <label>Link</label>
              <input className="border-2 p-1 w-96" type="text" value={app1Link} onChange={e => setApp1Link(e.target.value)}></input>
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col">
              <label>App 2 Name</label>
              <input className="border-2 p-1 w-200 w-96" type="text" value={app2Name} onChange={e => setApp2Name(e.target.value)}></input>
            </div>
            <div className="flex flex-col ml-5">
              <label>Use Case</label>
              <input className="border-2 p-1 w-96" type="text" value={app2UseCase} onChange={e => setApp2UseCase(e.target.value)}></input>
            </div>
            <div className="flex flex-col ml-5">
              <label>Link</label>
              <input className="border-2 p-1 w-96" type="text" value={app2Link} onChange={e => setApp2Link(e.target.value)}></input>
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col">
              <label>App 3 Name</label>
              <input className="border-2 p-1 w-200 w-96" type="text" value={app3Name} onChange={e => setApp3Name(e.target.value)}></input>
            </div>
            <div className="flex flex-col ml-5">
              <label>Use Case</label>
              <input className="border-2 p-1 w-96" type="text" value={app3UseCase} onChange={e => setApp3UseCase(e.target.value)}></input>
            </div>
            <div className="flex flex-col ml-5">
              <label>Link</label>
              <input className="border-2 p-1 w-96" type="text" value={app3Link} onChange={e => setApp3Link(e.target.value)}></input>
            </div>
          </div>
        </div>
        <div className=" flex w-40 justify-around mt-5">
          <button className="bg-green-500 p-3 h-10">Submit</button>  
          <Link to="/dashboard">
            <button className="bg-red-500 p-3 h-10 ">Cancel</button>
          </Link> 
        </div>
      </form> 
    </div>
  )
}

export default Questionnaire