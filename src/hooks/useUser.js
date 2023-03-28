import {React, useEffect, useState, useContext, useCallback} from 'react'
import UserContext from '../Context/UserContext';
import {loginService} from '../services/login';

export function useUser(){

    const {user, setUser}=useContext(UserContext)

    useEffect(()=>{  
        let access_token=localStorage.getItem('access_token')
        if(access_token != null)setUser({...user, access_token:access_token});
      } 
      ,
      []
    )

    const userLogin=useCallback((email,password)=>{
        console.log(email,password)
        loginService(email,password)
        .then(res => {
            if (!res) throw new Error('failed to log in')
            console.log('logged in: ')
            setUser({...user,email:email, access_token:res.access_token})
            localStorage.setItem('access_token',res.access_token)
        })
        .catch(err=>{
            alert('user or password incorrect')
            setUser({...user,email:email, access_token:null})
            console.log('failed to login: ',err)
        })
    },
    [setUser]
    )
    
    const userLogout=useCallback(()=>{
      console.log('log out')
      setUser({...user,access_token:null})
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
        user: user
      }
      
    )
  }
