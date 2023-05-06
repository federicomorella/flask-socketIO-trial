import React, { useCallback, useContext ,useState} from 'react'
import UserContext from '../../Context/UserContext'
import { Button ,InputGroup,Form,Spinner} from 'react-bootstrap'
import {removeContactService,addContactService} from '../../services/contact'
import {ContactList} from './ContactList'
const Contacts = () => {
    let {user,setUser}=useContext(UserContext)
    let [loading,setLoading]=useState(false)
    console.log('contacts',user.contacts)

    const removeContact=useCallback(async (username)=>{
        setLoading(true)
        let res=await removeContactService(username,user.accessToken)
        if(res){
            console.log(user.contacts,' ',username)
            let index=user.contacts.findIndex(e=>e.username==username)
            console.log('contact removed: ', user.contacts[index],index)
            let newContacts=user.contacts.slice()
            newContacts.splice(index,1)
            setUser({...user,contacts:newContacts})            
        }
        else
            alert('Failed to remove contact')
        setLoading(false)

    },
    [user])


    const addContact=useCallback(async (contactUserName)=>{
        setLoading(true)
        console.log('Adding contact: ',contactUserName)
        let res=await addContactService(contactUserName,user.accessToken)
        if(res && user.contacts.indexOf( contactUserName)==-1){
            let newContacts=user.contacts.slice()
            newContacts.push({username:contactUserName})
            setUser({...user,contacts:newContacts})
        }
        else
            alert('User not found or failed to add')
        setLoading(false)
    },
    [user])


  
    return (
        <>
            <ContactList 
                contacts={user.contacts}
                onAdd={addContact}
                onSelect={()=>{}}
                onRemove={removeContact}
                loading={loading}
            />
        </>
    )
}

export default Contacts