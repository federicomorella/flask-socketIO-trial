import React from 'react'
function Login({login}) {

  const handleLogIn=(e)=>{
    e.preventDefault();
    login(e.target.username.value,e.target.password.value)
  }

  return (
    <form onSubmit={handleLogIn}>
      <div>
        <input id="username" name="username" type="text" placeholder='username' required={true} />
      </div>

      <div>
        <input id="password" name="password" type="password" placeholder='password' required={true}/>
      </div>

      <button type="submit">Log in</button>
    </form>    
  )
}

export default Login