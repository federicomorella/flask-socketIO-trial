import React from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import { useState } from 'react';

function Login({login}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogIn=(e)=>{
    e.preventDefault();
    handleClose()
    login(e.target.username.value,e.target.password.value)
  }

  return (

    <>
      
      <Button variant="outline-light" onClick={handleShow}>
        Login
      </Button>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogIn}>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control 

                id="username" 
                name="username" 
                type="text" 
                required={true}>        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                id="password" 
                name="password" 
                type="password" 
                required={true}>        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Button 
                className='offset-8 me-1'
                variant="outline-dark"
                type="submit">              
                Login
              </Button>
              <Button 
                className='me-1'
                variant="outline-dark"
                onClick={handleClose}>              
                Cancel
              </Button>
            </Form.Group>

                  {/* <div>
              <input id="username" name="username" type="text" placeholder='username' required={true} />
            </div> 

            <div>
              <input id="password" name="password" type="password" placeholder='password' required={true}/>
            </div>

            <button type="submit">Log in</button>
          </form>    */}
          </Form>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default Login