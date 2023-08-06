import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "./style.css"
import { Context, serverurl } from '..'
import axios from 'axios'
import logo from "./images/todo.png"
import { toast } from 'react-hot-toast'
const Navbar = () => {

  const { isauthenticated, setisauthenticated, loading, setloading } = useContext(Context);
  const submithandler = async (e) => {
    try {
      const data = await axios.get(`${serverurl}/logout`, {
        withCredentials: true,
      })
      toast.success("user loged out")
      setisauthenticated(false);
      setloading(false)

    } catch (error) {
      setisauthenticated(true);
      console.log(error);
      setloading(false);
      toast.error("error")
    }
  }

  // const {isauthenticated}=useContext(Context);
  return (
    <div className='navbar'>
      <Link to="/" className='log'><h1>TODO.</h1>
        <img src={logo} alt="todo" className='logo' />
      </Link>
      <div className='btns'>
        <Link to="/">HOME</Link>
        <Link to="/profile">PROFILE</Link>
        {(isauthenticated) ? <button onClick={submithandler} disabled={loading}>LOGOUT</button> : <Link to="/login">LOGIN</Link>}
        {/* <Link to="/signup">SIGNUP</Link> */}
      </div>
    </div>
  )
}

export default Navbar
