import React, { useState } from "react"
// import './login.css'
const Login = () => {
  const [email, setemail] = useState('') 
  const [password, setpassword ] = useState('')
  const [loading, setloading] = useState(false)

  const login = (e) => {
    e.preventDefault();
    setloading(true);

    fetch('http://192.168.4.34:8040/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            Authorization: 'TheReturnedToken',
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.user);
    })
    .catch(error => {
        console.error('Login error:', error.message);
        alert('user not foudnd')
      })
    .finally(() => {
        setloading(false);
    });
};

  return (
    <>
      <div className="loginpage">
        <div className="blackcover">
          <form className="formlogin" action="" onSubmit={login}>
            <h1>Login</h1>
            <label >Email</label>
            <input type="email" onChange={(e) => setemail(e.target.value)} placeholder="Your Email..." required/>
            <label >Password</label>
            <input type="Password" onChange={(e) => setpassword(e.target.value)} placeholder="Your Password..." required />
            <p style={{paddingTop: 10,paddingBottom: 10}}>if you don't have account <a href="/signup">Sign up</a></p>
            <input className="btnlogin" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Login