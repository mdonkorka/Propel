import React, { useState } from "react"

function Questionnaire() {
  const [attendance, setAttendance] = useState("");
  const [absences, setAbsences] = useState("");
  const [faliures, setFaliures] = useState("")
  const [studytime, setStudyTime] = useState("");
  const [lastgrade, setLastGrade] = useState("");

  //top three apps needs to be added here
  //also make sure user is authenticated before they can access this page

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { attendance, absences, faliures, studytime, lastgrade };
      const response = await fetch ("http://localhost:4000/questionnaire/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (!response.ok) {
        throw Error(`Respose Status Code: ${response.status}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={onSubmitForm}>
        <label className="mt-20">What is your atttendance?</label>
        <input className="border-2 p-1 w-200 w-96" type="text" value={attendance} onChange={e => setAttendance(e.target.value)}></input>
        <label className="mt-5" >How many absences do you have?</label>
        <input className="border-2 p-1 w-96" type="text" value={absences} onChange={e => setAbsences(e.target.value)}></input>
        <label className="mt-5">How many past faliures do you have?</label>
        <input className="border-2 p-1 w-96" type="text" value={faliures} onChange={e => setFaliures(e.target.value)}></input>
        <label className="mt-5">On Average, how long do you study each week?</label>
        <input className="border-2 p-1 w-96" type="text" value={studytime} onChange={e => setStudyTime(e.target.value)}></input>
        <label className="mt-5">What was your last grade (percentage)?</label>
        <input className="border-2 p-1 w-96" type="text" value={lastgrade} onChange={e => setLastGrade(e.target.value)}></input>
        <button className="bg-green-500 p-1 h-10 w-20 mt-5">Submit</button>
      </form>    
    </div>
  )
}

export default Questionnaire