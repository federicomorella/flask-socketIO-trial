import React from 'react'
import {useUser} from '../../hooks/useUser'
function Login() {
  const {login}=useUser()

  const handleLogIn=(e)=>{
    e.preventDefault();
    login(e.target.email.value,e.target.password.value)
  }

  return (
    <form onSubmit={handleLogIn}>
      <div>
        <input id="email" name="email" type="email" placeholder='email' required={true} />
      </div>

      <div>
        <input id="password" name="password" type="password" placeholder='password' required={true}/>
      </div>

      <button type="submit">Log in</button>
    </form>    
  )
}

export default Login