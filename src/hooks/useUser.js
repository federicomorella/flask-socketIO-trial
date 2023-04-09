import {React, useEffect, useState, useContext, useCallback} from 'react'
import UserContext from '../Context/UserContext';
import {loginService,getUserInfoService} from '../services/user';
import ws_connect from '../services/ws';

export function useUser(){

    const {user,setUser}=useContext(UserContext)
    const [socket,setSocket]=useState(null)

    /**
     * verify if there is an existing access token in localStorage
     * If there is a token then gets user info.
     */
    useEffect(()=>{  
        let token=localStorage.getItem('access_token')
        if(token){ //if there is a previos token then gets user info
          console.log('access_token found in localStorage\nGetting user info...')
          getUserInfoService(token)
          .then(u=>{
            console.log('user:',u)
            if(u && u.username){
              setUser({...user,...u,accessToken:token})
            }

            let ws=ws_connect(token)
            setSocket(ws)
            ws.emit('join',{username:u.username,room:'1234'})

            })
          .catch(err=>{
            console.log(err)
            logout()
          })
          }
      } 
      ,
      []
    )

    /**
     * Log in user by username and password
     * If success stores access token in user.access_token and 
     * username in user.username
     * @param {String} username
     * @param {String} password
     */
    const userLogin=useCallback((username,password)=>{
        console.log(username,password)
        loginService(username,password)
        .then(token => {
            if (!token) throw new Error('Failed to log in')
            console.log('logged in: ')
            
            // Connected to server
            setUser({...user,username:username, accessToken:token})
            localStorage.setItem('access_token',token)
            
            // Connect to SocketIO server
            let ws=ws_connect(token)
            setSocket(ws)
        })
        .catch(err=>{
            alert('user or password incorrect')
            setUser({...user,username:'', accessToken:null})
            console.log('failed to login: ',err)
        })
    },
    [setUser,setSocket]
    )


    /**
     * Gets current user information and stores it in user
     * If fails to get user information then logout user
     */
    const getUserInfo=useCallback(()=>{
      try{
        let u=getUserInfoService(user.accessToken)
        console.log(u)
        if(u && u.username){
          setUser(...user,...u)
        }
      }
      catch(err){
        console.log(err)
        userLogout()//if failed to get user info then logout user
      }
    },
    [setUser])



    /**
     * Log out user by deleting token from localStorage and user.access_token
     * user.username is set to ''
     */
    const userLogout=useCallback(()=>{
      console.log('log out')
      setUser({...user,username:'',accessToken:null})
      localStorage.setItem('access_token','')
    },
    [setUser])



    const userSignup=useCallback((userData)=>{
       
    },
    [setUser]
    )
  

    return (
      {
        login: userLogin,
        logout: userLogout,
        signup: userSignup,
        socket:socket,
        user: user
      }
      
    )
  }
