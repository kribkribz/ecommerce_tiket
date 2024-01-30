'use client'
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import React, { useEffect, useState } from "react"
import Image from "next/image"


export const Header = () => {
  const [nav, setNav] = useState(false)
  const [color, setColor] = useState('transparent')
  const [textColor, setTextColor] = useState('white')

  const handleNav = () => {
      setNav(!nav)
  }

  useEffect (() => {
    const changeColor =() => {
        if(window.scrollY >= 90){

            setColor(`#ffffff`)
            setTextColor('#000000')
        } else {
            setColor('transparent')
            setTextColor('#ffffff')
        }
    }
  })

  return(
     <div style={{backgroundColor: `white`}}className="fixed left-0 top-0 z-10 w-full">
          <div className="max-w-[1840px] flex justify-between items-center gap-6 mt-3 py-2 font-bold ">
          
          <Link href='/'>
              <div className="sm: px-4">
                  <Image 
                  alt='/'
                  src='https://wp.eventhub.net/wp-content/uploads/2019/11/13.png'
                  className="w-[10rem]"
                  width='200'
                  height='200'/>
              </div>
          </Link>

          <div className="sm:flex text-2xl">
            <form className="sm: w-[20rem] md:w-[40rem]">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here " required/>
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
          </div>

        <ul style={{color: `black`}} className="hidden md:flex text-[1vw]">
            <Link href="./#findevent">
                <li  className="p-4">
                    Find Events
                </li>
            </Link>
            <Link href="./AboutUs">
                <li className="p-4">
                    Create Events
                </li>
            </Link>
            <Link href='./Login'>
                <li className="p-4">
                    Log In
                </li>
            </Link>
            <Link href="./Register">
                <li className="p-4">
                    Sign Up
                </li>
            </Link>
        </ul>
    

      {/* Mobile Button */}
      <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? <AiOutlineClose size={30} style={{color: `${textColor}`}} /> 
          : 
          <AiOutlineMenu size={30} style={{color: `black`}}/>}
      </div>
      {/* Mobile Menu */}
      <div 
          className={
          nav ? 
          'sm:hidden text-white absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-induration-300'
          : 
          'sm:hidden text-white absolute top-0 left-[100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-induration-300'
          }
      >
          <ul>
              <Link href="./">
                  <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                      Home
                  </li>
              </Link>
              <Link href="./AboutUs">
                  <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                      About Us
                  </li>
              </Link>
              <Link href='/#products'>
                  <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                      Gallery
                  </li>
              </Link>
              <Link href="./login">
                  <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                      Teams
                  </li>
              </Link>
          </ul>
  </div>
      
  </div>
</div>
  )

}

