import { useState, useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router'
import '/src/App.css'
import { apiFetch } from '/src/api'
import Login from '/src/pages/Login'
import Register from '/src/pages/Register'
import Main from '/src/pages/Main'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  async function getUser() {
    const response = await apiFetch("/api/me/")

    if (response.ok) {
      const data = await response.json()
      setUser(data)
    } else {                                /*token sahte veya eski*/
      localStorage.removeItem("token")
      setToken(null)
    }
  }

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token])                               /*token degisince tekrar calis*/

  return (
    <>
      <Routes>
          <Route path="" element={token ? <Navigate to="/Main" /> : <Login setToken={setToken} />} />
          <Route path="/register" element={token ? <Navigate to="/Main" /> : <Register />} />
          <Route path="/Main" element={token ? <Main setToken={setToken} user={user}/> : <Navigate to="/"/>} />
      </Routes>
    </>
  )
}

export default App
