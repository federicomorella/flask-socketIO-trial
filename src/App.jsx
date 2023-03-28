import { useState } from 'react'
import Login from './Components/Login'
import Logout from './Components/Logout'
import { useUser } from './hooks/useUser'
import './App.css'

function App() {
 
  const {user}=useUser()

  return (
    <div className="App">

      {user && user.access_token?<Logout></Logout>:<Login></Login>}

    </div>
  )
}

export default App
