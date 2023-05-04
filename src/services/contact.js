import {API_URL} from "../../config"
/**************************************************************************************
 * remove contact from user
 * @param {*} username 
 * @param {*} accessToken
 * @return true if success or false if fails
 */
export function removeContactService(username,accessToken){
    console.log('delete contact: ',username, ' token: ', accessToken)
    return fetch(`${API_URL}/user/contacts`,{
        method:'DELETE',
        headers: getHeaders(accessToken),
        body: JSON.stringify({username:username})
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to remove contact')
        return true
    })
    .catch(err=>{return false})

}



/**************************************************************************************
 * add contact to user
 * @param {*} contactUserName 
 * @param {*} accessToken
 * @return true if success or false if fails
 */
export function addContactService(contactUserName,accessToken){
    console.log('Add contact: ',contactUserName, ' token: ', accessToken)
    return fetch(`${API_URL}/user/contacts`,{
        method:'POST',
        headers: getHeaders(accessToken),
        body: JSON.stringify({username:contactUserName})
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to add contact')
        return true
    })
    .catch(err=>{return false})

}



function getHeaders(token){
    let headers=token?{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }:
    {'Content-Type': 'application/json'}
    return headers
}