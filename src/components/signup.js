import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "./style.css"
import axios from "axios"
import toast from "react-hot-toast"
import { Context, serverurl } from '../index'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isauthenticated, setisauthenticated ,setloading} = useContext(Context);
    setloading(true);
    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${serverurl}/register`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, //to enable cookies
            })
            toast.success(data.message)
            setisauthenticated(true)
            setloading(false);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            setisauthenticated(false);
            setloading(false);
        }

    }

    if (isauthenticated) {
        console.log(isauthenticated)
        return (<Navigate to={"/task"} />)
    }
    else {
        return (
            <div>
                <h1 className='title'>signup page</h1>
                <form onSubmit={submithandler} className="forml">
                    <input type="text" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='sub'>signup</button>
                    <div className="opt">
                    <span>already a user?</span> <Link to="/login" className='alt'>login</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup
