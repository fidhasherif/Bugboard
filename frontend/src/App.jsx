import { useState } from "react"

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")
  const [bugs, setBugs] = useState([])
  const [title, setTitle] = useState("")
  const [type, setType] = useState("Functional")
  const [severity, setSeverity] = useState("Medium")

  async function loadBugs(userToken) {
    const res = await fetch("http://localhost:5001/api/bugs", {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    const data = await res.json()
    if (res.ok) {
      setBugs(data)
    }
  }

  async function handleLogin() {
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setToken(data.token)
        setMessage("Logged in!")
        loadBugs(data.token)
      } else {
        setMessage(data.message)
      }
    } catch (err) {
      setMessage("Could not reach the server")
    }
  }

  async function handleAddBug() {
    try {
      const res = await fetch("http://localhost:5001/api/bugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, type, severity }),
      })
      const data = await res.json()
      if (res.ok) {
        setTitle("")
        setMessage("Bug added!")
        loadBugs(token)
      } else {
        setMessage(data.message)
      }
    } catch (err) {
      setMessage("Could not reach the server")
    }
  }
    async function handleDelete(id) {
    await fetch(`http://localhost:5001/api/bugs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    loadBugs(token)
  }

  async function handleFixed(id) {
    await fetch(`http://localhost:5001/api/bugs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "Fixed" }),
    })
    loadBugs(token)
  }

  return (
    <div>
      <h1>BugBoard 🐞</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log in</button>
      <p>{message}</p>

      {token && (
        <div>
          <h2>Report a bug</h2>
          <input
            placeholder="Bug title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>UI</option>
            <option>Functional</option>
            <option>Performance</option>
            <option>Other</option>
          </select>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button onClick={handleAddBug}>Add bug</button>

          <h2>Your bugs</h2>
          {bugs.length === 0 && <p>No bugs yet</p>}
                    {bugs.map((bug) => (
            <p key={bug._id}>
              {bug.title} - {bug.type} - {bug.severity} - {bug.status}
              <button onClick={() => handleFixed(bug._id)}>Mark fixed</button>
              <button onClick={() => handleDelete(bug._id)}>Delete</button>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default App