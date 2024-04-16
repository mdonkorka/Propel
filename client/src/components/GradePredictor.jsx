// import { response } from 'express';
import React , { useEffect, useState } from 'react'

import bot_icon from '../assets/bot_icon.png'

function GradePredictor() {

  const [grade, setGrade] = useState(false)

  useEffect(() => {
    getGradePrediction();
  }, [])

  const getGradePrediction = async () => {
    try {
      const fetchedGradePredictor = await fetch ("http://localhost:4000/gradepredictor", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });

      const response = await fetchedGradePredictor.json()
      setGrade(response.result)
      
    } catch (err) {
      console.log(err);
    }
  } 

  if (!grade) {
    return (
      <div>
      <div className='flex justify-center align-middle'>
        <div className='self-center mr-5 text-3xl'>GradePredictor</div>
        <img src={bot_icon} className='w-14'></img>
      </div>
      <div className='flex justify-center'>
        <div className='flex justify-center mt-5 mb-10 text-3xl font-extrabold text-white bg-black py-2 px-2 rounded-2xl'>Grade Loading...</div>
      </div>
    </div>
    )
  }

  return (
    <div>
      <div className='flex justify-center align-middle'>
        <div className='self-center mr-5 text-3xl'>GradePredictor</div>
        <img src={bot_icon} className='w-14'></img>
      </div>
      <div className='flex justify-center'>
        <div className='flex justify-center mt-5 mb-10 text-6xl font-extrabold text-white bg-black py-2 w-60 rounded-2xl'>{grade.toFixed(2)}%</div>
      </div>
    </div>
    
  )
}

export default GradePredictor