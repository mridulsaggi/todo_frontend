import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/login';
import Navbar from './components/navbar';
import Signup from './components/signup';
import Task from './components/task';
import { Toaster } from "react-hot-toast"
import Home from './components/Home';
import axios from 'axios';
import { Context, serverurl } from '.';
import Profile from './components/profile';
import Loader from './components/loader';
function App () {
    
    const {setuser,setisauthenticated,loading,setloading}=useContext(Context);
    useEffect(() => {
        setloading(true);
        const data=axios.get(`${serverurl}/user`,{
            withCredentials:true,
    }).then((res=>{
        // console.log(res.data.user)
        setuser(res.data.user);
        setisauthenticated(true);
        setloading(false);
    })).catch(err=>{
        setisauthenticated(false);
        setuser({});
        setloading(false)
        // console.log(err)
    })
}, [])

    return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/task" element={<Task />}></Route>
                </Routes>
                <Toaster></Toaster>
            </Router>
    )
}

export default App
