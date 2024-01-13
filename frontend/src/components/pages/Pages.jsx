import React, { useEffect, useState } from "react";
// import Header from "../common/header/Header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../singup/Signup";
import Home from "../home/Home";
import Createlive from "../createlive/Createlive";
import Mylive from "../mylive/Mylive";
// import Footer from "../common/footer/Footer"

const Pages = () => {
  // make request to server and upload files

  return (
    <>
      <Router>
        {" "}
        {/* <Header /> */}{" "}
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route exact path="/login" component={Login} />{" "}
          <Route exact path="/signup" component={Signup} />{" "}
          <Route exact path="/createlive" component={Createlive} />{" "}
          <Route exact path={`/live/:`} component={Mylive} />{" "}
        </Switch>{" "}
        {/* <Footer /> */}{" "}
      </Router>{" "}
    </>
  );
};

export default Pages;
