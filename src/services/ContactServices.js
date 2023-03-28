import {API_URL} from "./config"

export function getContacts(){
    return fetch(`${API_URL}/contact`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to get contacts')
        return res.json()
    })
    .catch(err=>{return null})

}