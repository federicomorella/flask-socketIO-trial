import {API_URL} from "./config"

export function loginService(email,password){
    return fetch(`${API_URL}/login`,{
        method:'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({email:email,password:password})
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to log in')
        return res.json()
    })
    .catch(err=>{return null})

}