import {API_URL} from "../../config"
/**************************************************************************************
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


/**************************************************************************************
 * Register a new user
 * @param {*} username 
 * @param {*} password 
 * @param {*} email 
 * @returns access_token
 */
export function registerService(username,password,email){
    console.log('New user:',{username,password,email})
    return fetch(`${API_URL}/signup`,{
        method:'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({username,password,email})
    })
    .then(res=>{
        if(res.status==409){
            alert('User name or email already exists')
            throw new Error('username or password already exists')
        }
        if(!res.ok) throw new Error('failed to register')
        return res.json()
    })
    .catch(
        err=>{return null}
        )

}


/**************************************************************************************
 * Update User data
 * @param {*} token 
 * @param {*} username 
 * @param {*} password 
 * @param {*} email 
 */
export function updateService(token,username,password,email){
    console.log('Updating:',{username,password,email})
    let body={username}
    if(password)body['password']=password
    if(email)body['email']=email
    return fetch(`${API_URL}/user`,{
        method:'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    })
    .then(res=>{
        if(res.status==409){
            alert('email already registered')
            throw new Error('email already registered')
        }
        if(!res.ok) throw new Error('failed to update user data')
        console.log('User data update successfully')
        return res.json()
    })
    .catch(
        err=>{return null}
        )

}

/**************************************************************************************
 * Gets user information
 * @param {*} token access token for the API
 * @returns user data {username,email,...}
 */
export function getUserInfoService(token){
    console.log('Getting user information...')
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