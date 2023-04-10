import React from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import { useState } from 'react';

function Register({register}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegister=(e)=>{
    e.preventDefault();
    handleClose()
    register(e.target.username.value,e.target.password.value,e.target.email.value)
  }

  return (

    <>
      
      <Button variant="outline-light" onClick={handleShow}>
        Register
      </Button>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control 
                id="username" 
                name="username" 
                type="text" 
                minLength={4}
                required={true}>        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                id="password" 
                name="password" 
                type="password" 
                minLength={4}
                required={true}>        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                id="email" 
                name="email" 
                type="email">        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Button 
                className='offset-4 me-1'
                variant="outline-dark"
                type="submit">              
                Register
              </Button>
              <Button 
                className='me-1'
                variant="outline-dark"
                onClick={handleClose}>              
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default Register