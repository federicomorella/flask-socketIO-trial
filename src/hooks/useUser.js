import {React, useEffect, useState, useContext, useCallback} from 'react'
import UserContext from '../Context/UserContext';
import {loginService,getUserInfoService,registerService,updateService} from '../services/user';
import ws_connect from '../services/ws';

export function useUser(){

    const {user,setUser}=useContext(UserContext)
    // const [socket,setSocket]=useState(null)
    const [loading,setLoading]=useState(false)

    /**************************************************************************************
     * verify if there is an existing access token in localStorage
     * If there is a token then gets user info.
     */
    useEffect(()=>{  
        let token=localStorage.getItem('access_token')
        if(token){ //if there is a previos token then gets user info
          console.log('access_token found in localStorage')
          let socket=socket_connect(token)
          getUserInfo(token)
          .then(user_data=>{
            setUser({...user,...user_data,accessToken:token,socket})
            console.log('User logged in')

            //join room
            socket.emit('join',{username:user_data?.username,room:'1234'})
          })
          .catch(err=>console.log('Failed to log in'))


          }
      } 
      ,
      []
    )

    /**************************************************************************************
     * Log in user by username and password
     * If success stores access token in user.access_token and 
     * username in user.username
     * @param {String} username
     * @param {String} password
     */
    const userLogin=useCallback(async (username,password)=>{
      console.log(username,password)
      try{
        let token=await loginService(username,password)

        if (!token) throw new Error('Failed to log in')

        console.log('logged in: ')
        
        //Get user info
        let user_data= await getUserInfo(token)
        localStorage.setItem('access_token',token)
        console.log('user_data:',user_data)

        // Connect to SocketIO server
        let socket=socket_connect(token)
        
        //join room
        socket.emit('join',{username:user_data?.username,room:'1234'})

        setUser({...user,...user_data,accessToken:token,socket})  
        console.log('User logged in :')      
      }
      catch(err){
        alert('user or password incorrect')
        setUser({...user,username:'', accessToken:null})
        console.log('failed to login: ',err)
      }
        
    },
    [user]
    )


    /**************************************************************************************
     * Register new user 
     * @param {String} username
     * @param {String} password
     * @param {String} email
     */
        const userRegister=useCallback((username,password,email)=>{
          console.log('Register new user: '+username)
          setLoading(true)
          registerService(username,password,email)
          .then(res => {
              if (!res) throw new Error('Failed to register')
              console.log('New user created ')
              console.log('Logging in new user...')
              // Log in new user
              userLogin(username,password)
          })
          .catch(err=>{
              console.log('failed to crea new user')
          })
          setLoading(false)
      },
      []
      )

    /**************************************************************************************
     * Update user data
     * @param {String} password
     * @param {String} email
     */
          const userUpdate=useCallback(async (password,email)=>{
            console.log('Updating user data:' ,user.username)
            setLoading(true)
            updateService(user.accessToken,user.username,password,email)
            .then(res => {
                console.log(res)
                if (!res) throw new Error('Failed to update')
                console.log('User data updated ')
                setUser({...user,email,password})
            })
            .catch(err=>{
                console.log(err)
            })
            setLoading(false)
        },
        [user]
        )

    /**************************************************************************************
     * Gets current user information
     * If fails then logout user and return null
     * @returns user = {username,email,...}
     */
    const getUserInfo=useCallback(async (accessToken)=>{
      setLoading(true)
      try{        
        let user_data=await getUserInfoService(accessToken)
        console.log('user data:',user_data)
        setLoading(false)
        return user_data
      }
      catch(err){
        setLoading(false)
        console.log(err)
        userLogout()//if failed to get user info then logout user
      }
      
    },
    [user])



    /**************************************************************************************
     * Log out user by deleting token from localStorage and user.access_token
     * user.username is set to ''
     */
    const userLogout=useCallback(()=>{
      console.log('log out')

      console.log('Disconnecting ws')
      if(user?.socket)
        user.socket.disconnect()  

      setUser({...user,username:'',accessToken:null,socket:null,contacts:[],rooms:[]})
      localStorage.setItem('access_token','')
    },
    [user])

    /**************************************************************************************
     * Connect to ws and save the socket to the userContext
     * @returns socket or null
     */
    const socket_connect=useCallback((token)=>{
      console.log('Creating ws connection')
      let socket=ws_connect(token)
      
      if(socket){
        //actualiza socket en el userContext
        return socket
      }
      else
        userLogout() 
        return null     
    },
    [user])



    return (
      {
        login: userLogin,
        register:userRegister,
        logout: userLogout,
        updateUser: userUpdate,
        // socket:socket,
        user: user,
        loading:loading
      }
      
    )
  }
