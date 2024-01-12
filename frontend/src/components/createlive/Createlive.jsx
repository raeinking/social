import React, { useState } from 'react'

function Createlive() {
    const [email, setemail] = useState('') 
    const [password, setpassword ] = useState('')
    const [loading, setloading] = useState(false)
  
    const create = (e) => {
        e.preventDefault();
        setloading(true)
        console.log('test word')
    }
  
    return (
      <>
        <div className="loginpage">
          <div className="blackcover">
            <form className="formlogin" action="" onSubmit={create}>
              <h1>Create Live</h1>
              <label >Title</label>
              <input type="text" placeholder="Your Title..." required/>
              <label >Thubnail</label>
              <input type="file" required />
              <input className="btnlogin" type="submit" value="Create" />
            </form>
          </div>
        </div>
      </>
  )
}

export default Createlive