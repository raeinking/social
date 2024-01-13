import React, { useEffect, useState } from 'react'
import './home.css'
import Blog from '../blog/Blog'
import Header from '../Header/Header'
import { useHistory } from 'react-router-dom';
function Home() {
    const history = useHistory();

    useEffect(() => {
        if (!document.cookie.includes('name') || !document.cookie.includes('email') || !document.cookie.includes('userId') || !document.cookie.includes('token')) {
            history.push('/login');
        }
    }, [])




  return (
    <div className='container'>
        <div className="main-container">
            <Header /> 
            <Blog />
        </div>
    </div>
  )
}

export default Home