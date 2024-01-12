import React, { useEffect, useState } from "react"
// import Header from "../common/header/Header"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "../login/Login"
// import Footer from "../common/footer/Footer"


const Pages = () => {

 
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path='/' component={Login} />

        </Switch>
    {/* <Footer /> */}
      </Router>
    </>
  )
}

export default Pages