import {API_URL} from "./config"
/**
 * Log in user and gets access token
 * @param {*} username 
 * @param {*} password 
 * @returns access_token
 */
export function loginService(username,password){
    return fetch(`${API_URL}/login`,{
        method:'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({username:username,password:password})
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to log in')
        return res.json()
    })
    .then(body=>{
        return body.access_token
    })
    .catch(err=>{return null})

}


/**
 * Gets user information
 * @param {*} token access token for the API
 * @returns user data {username,email,...}
 */
export function getUserInfoService(token){
    console.log(token)
    return fetch(`${API_URL}/user`,{
        method:'GET',
        headers: getHeaders(token)
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to get user info')
        return res.json()
    })
    .then(user=>{return user})
    .catch(err=>{return null})

}

function getHeaders(token){
    let headers=token?{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }:
    {'Content-Type': 'application/json'}
    return headers
}