import React from 'react'
import welimg from "./images/welimg.jpg"
const Home = () => {
  return (
    <div className='home'>
    <div className='welcome'>
      <img src={welimg} className='welimg' alt="" />
      <h1 className='todo'>TO-DO APP</h1>
      
    </div>
    <h2 className='subtodo'>a website to organize your day to day tasks</h2>
    <h3 className='subsubtodo'>the user can easily login to the website and access his stored tasks.</h3>
    </div>
  )
}

export default Home
