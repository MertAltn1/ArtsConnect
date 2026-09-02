import { useState, useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router'
import './App.css'
import { apiFetch } from './api'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
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
