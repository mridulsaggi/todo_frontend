import React, { useContext } from 'react'
import { Context } from '..'
import { toast } from 'react-hot-toast';
import Loader from './loader';
import { Link } from 'react-router-dom';

const Profile = () => {
    const {user,setuser,isauthenticated,setloading,loading}=useContext(Context);
    if(!isauthenticated){
      return (
        <h1 className='heading'>please login first</h1>
      )
    }
  return (
    loading?<Loader/>:(
    <div className='profile'>
      <h2>{(<span><p className='name'>{user?.name}</p></span>)}</h2>
      <h2>{(<span><p className='email'>{(user?.email)}</p></span>)}</h2>
      <Link className='tbtn' to="/task">create task</Link>
      <Link className='tbtn'  to="/task">all task</Link>
    </div>
  )
  )
}

export default Profile
