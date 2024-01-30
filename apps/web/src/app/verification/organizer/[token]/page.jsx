'use client'
import { useEffect } from "react"
import axios from "axios"

export default function Page({params}) {
    useEffect(() => {
        axios.patch('http://localhost:8000/organizer/verified', null, {
            headers:{
                "authorization": params.token
            }
        })
    },[])
    return (
        <h1 className='text-3xl font-bold underline'>
          
            </h1>
    )
}