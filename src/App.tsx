import React from 'react'
import { Login } from 'components/pages'
import { Game } from 'components/pages'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const PrivateRoute = () => {
  const auth = null

  return auth ? <Outlet /> : <Navigate to="/login" />
}

const App = () => (
  <div className="app">
    <Routes>
      <Route path="/game" element={<PrivateRoute />}>
        <Route path="/game" element={<Game />} />
      </Route>
      <Route path="/settings" element={<div>Profile</div>} />
      <Route path="/registration" element={<div>Registration</div>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
)

export default App

