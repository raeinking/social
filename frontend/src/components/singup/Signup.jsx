import React, { useState } from "react"
import '../login/login.css'
const Signup = () => {

  return (
    <>
      <div className="loginpage">
        <div className="blackcover">
          <form className="formlogin" action="">
            <h1>Login</h1>
            <label >Email</label>
            <input type="email" placeholder="Your Email..." required/>
            <label >Password</label>
            <input type="Password" placeholder="Your Password..." required />
            <p style={{paddingTop: 10,paddingBottom: 10}}>if you don't have account <a href="/signup">Signup</a></p>
            <input className="btnlogin" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup