import React, { useState } from 'react'
import {useUser} from '../../hooks/useUser'
import { getContacts } from '../../services/ContactServices'
function Logout() {
  const {logout}=useUser()
  const [contactos,setContactos]=useState([])
  const handleLogOut=(e)=>{
    e.preventDefault();
    logout()
  }

  const handleGetContacts=(e)=>{
    e.preventDefault();
    getContacts()
    .then(c=>{
      if(c)
        setContactos([...c]);
    })
  }
  console.log(contactos)
  const contactList=contactos.map(c=>{
    return(
      <li>
        {c.firstname + ': ' + c.email}
      </li>
    )
  })
  return (
    <>
      <button onClick={handleLogOut}>
        Log out
      </button>  
      <button onClick={handleGetContacts}>
        get contacts
      </button>
      <ul>
        {contactList}
      </ul>

    </>

  )
}

export default Logout