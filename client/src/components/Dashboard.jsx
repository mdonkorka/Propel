

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
      <button className="mt-20" onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard