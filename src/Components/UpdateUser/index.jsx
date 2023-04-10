import React, { useContext, useEffect } from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import { useState } from 'react';
import UserContext from '../../Context/UserContext';


function UpdateUser({updateUser}) {
  const {user}=useContext(UserContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave=(e)=>{
    e.preventDefault();
    handleClose()
    updateUser(e.target.password.value,e.target.email.value)
  }
  

  return (

    <>
      
      <Button variant="light" onClick={handleShow}>
        {user.username}
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update user information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control 
                id="username" 
                name="username" 
                type="text" 
                required={true}
                disabled
                defaultValue={user.username}
                >        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                id="password" 
                name="password" 
                type="password" 
                minLength={4}
                required={true}
                defaultValue={''}>        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                id="email" 
                name="email" 
                type="email"
                defaultValue={user.email}
                >        
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Button 
                className='offset-4 me-1'
                variant="outline-dark"
                type="submit">              
                Save
              </Button>
              <Button 
                className='me'
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

export default UpdateUser