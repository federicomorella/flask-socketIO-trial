import React, { useState } from 'react'

function Logout({logout}) {

  const handleLogOut=(e)=>{
    e.preventDefault();
    logout()
  }


  return (
    <>
      <button onClick={handleLogOut}>
        Log out
      </button>  
    </>

  )
}

export default Logout