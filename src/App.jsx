import { useState } from 'react'
import Login from './Components/Login'
import Logout from './Components/Logout'
import { useUser } from './hooks/useUser'
import './App.css'
import { WSTest } from './Components/WSTest'

function App() {
 
  const {user,socket,login,logout}=useUser()

  return (
    <div className="App">
      {user && user.accessToken?<h3>Usuario: {user.username}</h3>:<h3>Please log in</h3>}
      {user && user.accessToken?<Logout logout={logout}></Logout>:<Login login={login}></Login>}

      {user && user.accessToken?<WSTest socket={socket}/>:<></>}
    </div>
  )
}

export default App
