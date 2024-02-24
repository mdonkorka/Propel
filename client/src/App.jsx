import Intro from './components/Intro.jsx'
import Navbar from './components/Navbar.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Questionnaire from './components/Questionnaire.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Intro/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/questionnaire" element={<Questionnaire/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
