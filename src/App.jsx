import { useEffect, useState } from 'react'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Register from './Components/Register'
import UpdateUser from './Components/UpdateUser'
import { useUser } from './hooks/useUser'
// import './App.css'
import { WSTest } from './Components/WSTest'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Button,Container,Nav,Stack,Spinner} from 'react-bootstrap'
import {Link,Route, useLocation} from 'wouter'

function App() {

  const {user,socket,login,logout,register,updateUser,loading}=useUser()
  const [location,setLocation]=useLocation()
  useEffect(()=>{
    if(user?.username)
      setLocation('/app',{socket:socket})
    else
      setLocation('/',{socket:socket})

  },[user]
  )

  console.log('app:',user)
  return (
    <Container bg="dark" fluid className="App">
      <Navbar fluid bg="warning" expand="lg">        
        <Navbar.Brand className='ms-3' href="#">
            SocketIO-Test
        </Navbar.Brand>
        <Stack direction='horizontal' className="ms-auto" gap="1">
          {user && user.accessToken?
            <>
              <UpdateUser updateUser={updateUser}/>
              <Logout logout={logout}/>
            </>:
            <>
              <Register register={register}/>
              <Login login={login}/>
            </>}
        </Stack>
      </Navbar >
    

      
  

      <Route path="/">Welcome to my SocketIO sample project</Route>
      <Route path="/app">
        <WSTest socket={socket}/>
      </Route>
   
      {loading?<div><Spinner animation="border" variant="primary" size="sm" className='offset-5'/></div>:null}
      
    </Container>
  )
}

export default App
