// It is actually a mechanism that how it protectes pages & routes
// Also it is a protected container

import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    
    const navigate = useNavigate()
    // loading state 
    const [loader, setLoader] = useState(true)
    // Now first ask authStatus that are you logged in or not?
    const authStatus = useSelector((state) => state.auth.status)
    // Now useEffect will tell us where to send this user home etc & if there any small changes required then we will use that
    useEffect(() => {
    
      /* 
        if (authStatus === true ) {
             navigate("/")
        } else if (authStatus === false ) {
             navigate("/login")
        }
        
      */
    //   let authValue = authStatus === true ? true : false   
      
      if (authentication && authStatus !== authentication) {
        navigate("/login")
      } else if(!authentication && authStatus !== authentication){
        navigate("/")
      }
      setLoader(false)
    }, [authStatus, navigate, authentication])
    

    return loader ? <h1>Loading...</h1> : <> {children} </>
}