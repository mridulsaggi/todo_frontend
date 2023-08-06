import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context, serverurl } from '..';
import { toast } from 'react-hot-toast';
// import {delete} from "./delete.png";
import dimg from "./images/delete.png";
const Task = () => {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [tasks, settasks] = useState([])
  const [loading, setloading] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const submithandler = async (e) => {
    setloading(true)
    e.preventDefault();
    console.log(loading)
    try {
      await axios.post(`${serverurl}/new`, { title, desc }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      // console.log(data);
      toast.success("task added")
      setTitle("")
      setDesc("")
      setloading(false);
      setrefresh((prev)=>!prev)
    } catch (error) {
      toast.error("error");
      console.log(error);
      setrefresh((prev)=>!prev)
      setloading(false)
    }
  }
  const updatetask = async (id) => {
    try {
      await axios.put(`${serverurl}/${id}`, {},{
        withCredentials: true
      })
      setrefresh((prev)=>!prev)
      toast.success("updated");

    } catch (error) {
      toast.error("error")
      console.log(error);
      setrefresh((prev)=>!prev)
    }
  }
  const deletetask =async (id) => {
    setloading(true);
    console.log(loading);
    try {
      await axios.delete(`${serverurl}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          allowHeaders: ['Content-Type', 'X-Amz-Date', 'X-Amz-Security-Token', 'Authorization', 'X-Api-Key', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers']
        },
        withCredentials: true,
      })
      setrefresh((prev)=>!prev)
      setloading(false);
      toast.success("task deleted")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      setloading(false);
      setrefresh((prev)=>!prev)
    }
  }
  useEffect(() => {
    axios.get(`${serverurl}/mytasks`, {
      withCredentials: true,
    }).then((res) => {
      settasks(res.data.tasks)
    }).catch((err) => {
      console.log(err);
    })

  }, [refresh])

  if (!isauthenticated) {
    return (
      <div>
        <h1 className='heading'>Please login first</h1>
      </div>
    )
  }
  return (
    <div>
      <form onSubmit={submithandler} className='taskform'>
        <input type="text" name="title" id="" placeholder='title' required className='tit' value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" name="desc" id="" placeholder='descriptipn' required className='desc' value={desc} onChange={(e) => { setDesc(e.target.value) }} />
        <button type='submit' disabled={loading} className='tbtn'>Add</button>
      </form>
      <div className="todos">
        {
          tasks.map((a) => (
            <div className="task" key={a._id}>
              <div className='tasktop' >
                <div className='subtop'>
                  <p className='tasktitle'>{a.title}</p>
                  <p><input type="checkbox" className="cb" checked={a.cb} onChange={() => updatetask(a._id)} /></p>
                </div>
                <button className='tbtn' disabled={loading} onClick={() => deletetask(a._id)}>delete</button>
              </div>
              <p className='taskdesc'>{a.desc}</p>
              <p></p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Task;
