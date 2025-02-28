import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthApp = () => {
  return (
    <div className="main-wrapper">

      <Outlet/>
    </div>
  )
}

export default AuthApp