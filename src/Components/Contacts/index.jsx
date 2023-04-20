import React, { useCallback, useContext } from 'react'
import UserContext from '../../Context/UserContext'
import { Button ,InputGroup,Form} from 'react-bootstrap'
import {removeContactService,addContactService} from '../../services/contact'

const Contacts = () => {
    let {user,setUser}=useContext(UserContext)
    console.log('contacts',user.contacts)

    const removeContact=useCallback(async (username)=>{
        let res=await removeContactService(username,user.accessToken)
        if(res){
            console.log(user.contacts,' ',username)
            let index=user.contacts.findIndex(e=>e.username==username)
            console.log('contact removed: ', user.contacts[index],index)
            let newContacts=user.contacts.slice()
            newContacts.splice(index,1)
            setUser({...user,contacts:newContacts})
            
        }

    },
    [user])


    const addContact=useCallback(async (e)=>{
        e.preventDefault()   
        const contactUserName=e.target.contactUserName.value   
        console.log('Adding contact: ',contactUserName)
        let res=await addContactService(contactUserName,user.accessToken)
        if(res && user.contacts.indexOf( contactUserName)==-1){
            let newContacts=user.contacts.slice()
            newContacts.push({username:contactUserName})
            setUser({...user,contacts:newContacts})
            
        }
    },
    [user])

    let contactList=user.contacts.map(contact=>{return(
        <li key={contact.username}>
            <Button 
                className='mr-2 mt-0 mb-0'
                variant="secondary"
                size="sm">
                {contact.username}
            </Button>
            
            <Button 
                className='mr-2 mt-0 mb-0'
                variant="outline-secondary"
                onClick= {()=>removeContact(contact.username)}
                size="sm">
                    X
            </Button>
        </li>
    
        
        )
    })
    return (
        <>
            <h3 className='mt-2'>Contacts:</h3>
            <Form onSubmit={addContact} autoComplete="off">
                <InputGroup className="mb-3" >
                    <Form.Control
                    id='contactUserName'
                    placeholder="user name"
                    aria-label="contact username"
                    />
                    <Button type="submit" variant="outline-secondary" >
                    Add
                    </Button>
                </InputGroup>

            </Form>
 
            <ul>
                {contactList}
            </ul>
        </>
    )
}

export default Contacts