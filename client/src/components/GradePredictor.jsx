// import { response } from 'express';
import React , { useEffect, useState } from 'react'

function GradePredictor() {

  const [grade, setGrade] = useState('')

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

  return (
    <div>GradePredictor: {grade}</div>
    
  )
}

export default GradePredictor