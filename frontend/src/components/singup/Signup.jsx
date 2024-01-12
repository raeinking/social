import React, { useState } from "react"
import '../login/login.css'
const Signup = () => {

    const [fulname, setfullname] = useState('') 
    const [email, setemail] = useState('') 
    const [password, setpassword ] = useState('')
    const [loading, setloading] = useState(false)

    const Signup = (e) => {
        e.preventDefault();
        setloading(true)
        console.log('test word')
    }

  return (
    <>
      <div className="loginpage">
        <div className="blackcover">
          <form className="formlogin" action="" onSubmit={Signup} >
            <h1>Signup</h1>
            <label >Full Name</label>
            <input type="text" placeholder="Your name..." required/>
            <label >Email</label>
            <input type="text" placeholder="Your Email..." required />
            <label >Password</label>
            <input type="Password" placeholder="Your Password..." required />
            <p style={{paddingTop: 10,paddingBottom: 10}}>if you have account <a href="/login">Log in</a></p>
            <input className="btnlogin" type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup