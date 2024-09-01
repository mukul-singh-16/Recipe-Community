import axios from 'axios';
import React, { useState } from 'react'

const Test = () => {

    const [res,setres] =useState("");

    async function setcookies  (){

        console.log("fxcgvhbjnk")
        await axios.get(import.meta.env.VITE_SERVER_URL+"/set-cookie",{
            withCredentials: true,
           
          })

            setres("cookies set sucessfully")
        

    }

    async function showsession  (){
        const res = await axios.get(import.meta.env.VITE_SERVER_URL+"/sd",{
            withCredentials: true,
           
          })

        setres(res.data)
        

    }

    async function showcookies  (){
        const res = await axios.get(import.meta.env.VITE_SERVER_URL+"/showcookies")

            setres(res.data)
        

    }

    
  return (
    <>
    <button type='submit' onClick={setcookies} >set cookies </button>
    <button type='submit' onClick={showsession} >show session </button>
    {/* <button type='submit' onClick={showcookies} >show cookies </button> */}

    <div>{res}</div>

    </>
    
  )
}

export default Test