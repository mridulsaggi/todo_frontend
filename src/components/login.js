
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "./style.css"
import axios from 'axios'
import { Context, serverurl } from '..'
import { toast } from 'react-hot-toast'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isauthenticated, setisauthenticated,setloading,loading } = useContext(Context);
  const submithandler = async (e) => {
    setloading(true);
    console.log(loading)
    e.preventDefault();
    try {
      const data = await axios.post(`${serverurl}/login`, {
        email, password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      // console.log(data.data.name)
      toast.success(`Welcome back , ${data.data.name}`);
      setisauthenticated(true)
      setloading(false);
    } 
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      setisauthenticated(false)
      setloading(false);
    }
  }
  if (isauthenticated) {
    return <Navigate to={"/task"} />
  }
  return (
    <div>
      <h1 className='title'>login page</h1>
      <form className="forml" onSubmit={submithandler}>
        <input type="email" name="email" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" name="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button className='sub' disabled={loading}>login</button>
        <div className="opt">
        <span>Not a user?</span>
        <Link to="/signup" className='alt'>sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
