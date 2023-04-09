import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

function Logout({logout}) {

  const handleLogOut=(e)=>{
    e.preventDefault();
    logout()
  }


  return (
    <>
      <Button 
        variant='outline-light'
        onClick={handleLogOut}>
        Log out
      </Button>  
    </>

  )
}

export default Logout