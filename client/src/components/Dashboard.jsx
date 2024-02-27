import { Link } from "react-router-dom"

function Dashboard() {

  const logout = async e => {
    e.preventDefault();
    try {
      const response = await fetch ("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      });
      if (!response.ok) {
        throw Error(`Respose Status Code: ${response.status}`)
      }
      window.location = "/login";
    } catch (err) {
      
    }
  }

  return (
    <div>
      <div>
        <button className="mt-20 bg-gray-400 p-1 h-10" onClick={logout}>Logout</button>
      </div>
      <Link to="/questionnaire">
        <button className="mt-5 bg-gray-400 p-1 h-10">Questionnaire</button>
      </Link>
   </div>
  )
}

export default Dashboard