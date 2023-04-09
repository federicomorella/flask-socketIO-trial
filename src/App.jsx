import { useState } from 'react'
import Login from './Components/Login'
import Logout from './Components/Logout'
import { useUser } from './hooks/useUser'
// import './App.css'
import { WSTest } from './Components/WSTest'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Button,Container,Nav} from 'react-bootstrap'


function App() {

  const {user,socket,login,logout}=useUser()

  return (
    <Container bg="dark" fluid className="App">
      <Navbar fluid bg="warning" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">SocketIO-Test</Navbar.Brand>
          {user && user.accessToken?
            <Logout logout={logout}></Logout>:
            <Login login={login}></Login>}


        </Container>
      </Navbar >
    

      {user && user.accessToken?<WSTest socket={socket}/>:<></>}
    </Container>
  )
}

export default App
