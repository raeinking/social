import React from 'react'
import './home.css'
import Blog from '../blog/Blog'
import Header from '../Header/Header'
function Home() {



  return (
    <div className='container'>
        <div className="main-container">
            <Header /> 
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
        </div>
    </div>
  )
}

export default Home