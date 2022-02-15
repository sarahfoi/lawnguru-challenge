import React, { useState } from 'react';
import "./login.css"
import PropTypes from 'prop-types'

function loginUser(credentials){
    return fetch('http://localhost:5000/owner/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch(error => console.log(error))
}

export default function Login({ setToken }) {

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();

   const handleSubmit = async e => {
    e.preventDefault();
    const result = await loginUser({
      username,
      password
    });
    
    if(result.error){
        alert(result.error)
    }        
    else if(result.token){        
        setToken(result.token);    
        localStorage.setItem('username', JSON.stringify(username))        
    }
        
  }

  return(
    <div className='form-signin'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" onChange = {e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange = {e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}