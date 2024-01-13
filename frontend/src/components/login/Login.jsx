import React, { useState } from "react";
// import './login.css'
import loadinggif from "../../images/loading.gif";
import processgif from "../../images/checkprosees.gif";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useState(false);

  const login = (e) => {
    e.preventDefault();
    setloading(true);
    fetch('http://localhost:8060/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        document.cookie = `token=${data.token}; `;
        document.cookie = `name=${data.name}; `;
        document.cookie = `userId=${data.userId}; `;
        document.cookie = `email=${data.email}; `;
        setTimeout(() => {
          history.push("/");
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Login error:", error.message);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <>
      {" "}
      {loading ? (
        <div className="loading">
          <img src={loadinggif} alt="" srcset="" />
        </div>
      ) : null}{" "}
      <div className="loginpage">
        <div className="blackcover">
          <form className="formlogin" action="" onSubmit={login}>
            <h1> Login </h1> <label> Email </label>{" "}
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Your Email..."
              required
            />
            <label> Password </label>{" "}
            <input
              type="Password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Your Password..."
              required
            />
            <p style={{ paddingTop: 10, paddingBottom: 10 }}>
              if you don 't have account <a href="/signup">Sign up</a>{" "}
            </p>{" "}
            <input className="btnlogin" type="submit" value="Login" />
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Login;
