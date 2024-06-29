import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = ({ children }) => {
    const token = useSelector(state => state.user.token)
    const navigate=useNavigate()
    if (token) { navigate("/")}
  return (
    <div>
      {children}
    </div>
  )
}

export default Auth
