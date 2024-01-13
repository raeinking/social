import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import loadinggif from '../../images/loading.gif'
import processgif from '../../images/checkprosees.gif'
import '../login/login.css'
const Signup = () => {

    const [fulname, setfullname] = useState('') 
    const [email, setemail] = useState('') 
    const [password, setpassword ] = useState('')
    const [loading, setloading] = useState(false)
    const history = useHistory();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const register = (e) => {
        e.preventDefault();
        setloading(true);
    
        fetch('http://localhost:8060/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: fulname,
                email: email,
                password: password,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.user) {
                setloading(false);
                setRegistrationSuccess(true);
                setTimeout(() => {
                    history.push('/login');
                    window.location.reload();
                }, 2000);
            } else {
                throw new Error('Invalid response format');
            }
        })
        .catch(error => {
            console.error('Signup error:', error.message);
            alert('registration failed');
            setloading(false);
        })
        .finally(() => {
            setloading(false);
        });
    };
    
    

  return (
    <>
    {loading?<div className="loading">
        <img src={loadinggif} alt="" srcset="" />
    </div>: null}
    {registrationSuccess? <div className="loading">
        <img src={processgif} alt="" srcset="" />
    </div> :
    null}
        
      <div className="loginpage">
        <div className="blackcover">
          <form className="formlogin" action="" onSubmit={register} >
            <h1>Signup</h1>
            <label >Full Name</label>
            <input type="text" onChange={(e) => setfullname(e.target.value)} placeholder="Your name..." required/>
            <label >Email</label>
            <input type="text" onChange={(e) => setemail(e.target.value)} placeholder="Your Email..." required />
            <label >Password</label>
            <input type="Password" onChange={(e) => setpassword(e.target.value)} placeholder="Your Password..." required />
            <p style={{paddingTop: 10,paddingBottom: 10}}>if you have account <a href="/login">Log in</a></p>
            <input className="btnlogin" type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup