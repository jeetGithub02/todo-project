import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
    <Link to="/login" className="btn btn-primary">Login</Link>
    <Link to="/register" className="btn btn-warning">Register</Link>
    
    </div>
  )
}

export default Home