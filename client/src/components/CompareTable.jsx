import React, { Fragment, useState } from 'react'

function compareTable({selectedButton, friendsData, usersData}) {

  if (!friendsData) {
    return <div>Loading friends data...</div>;
  }

  // console.log("friendsData: ", friendsData);

  const sortedAttendance = [...friendsData].sort((a, b) => b.attendance - a.attendance);
  const sortedFaliures = [...friendsData].sort((a, b) => b.faliures - a.faliures);
  const sortedStudyTime = [...friendsData].sort((a, b) => b.studytime - a.studytime);
  const sortedAbsences = [...friendsData].sort((a, b) => b.absences - a.absences);
  const sortedLastGrade = [...friendsData].sort((a, b) => b.lastgrade - a.lastgrade);

  const sortedDataMap = {
    attendance: sortedAttendance,
    faliures: sortedFaliures,
    studytime: sortedStudyTime,
    absences: sortedAbsences,
    lastgrade: sortedLastGrade
  };

  const selectedButtonMap = {
    "attendance": "attendance",
    "faliures": "faliures",
    "studytime": "study time",
    "absences": "absences",
    "lastgrade": "last grade"
  }

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th className='px-6 py-1 w-52'>Username</th>
            <th className='px-6 py-1'>{selectedButtonMap[selectedButton]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='px-6 py-1 text-center'>{usersData.username}</td>
            <td className='px-6 py-1 text-center'>{usersData[selectedButton]}</td>
          </tr>
          {sortedDataMap[selectedButton].map((friend, index) => (
            <tr key={index}>
              <td className='px-6 py-1 text-center'>{friend.username}</td>
              <td className='px-6 py-1 text-center'>{friend[selectedButton]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default compareTable