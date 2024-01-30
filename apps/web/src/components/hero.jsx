import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Hero({heading, message}){
    return(
        <>
      
        {/* <div className="flex items-center justify-center bg-center h-screen 
         custom-img bg-cover "> */}

            {/* overlay */}
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]"/> */}
            {/* <div className= "text-center p-5 text-black font-bold mt-[14rem] mr-[15rem] z-[2] ">
                <h2 className="text-6xl">{heading}</h2>
                <p className="py-5 text-xl">{message}</p>
                <Link href='./BuyProducts'>
                    <button className="mt-16 px-10 py-2 text-2xl border bg-green-900 text-white ">Buy Tickets</button>
                </Link>
            </div>
        </div> */}

        <section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Event Hub</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Get any event you want here, from music, travel, even festival</p>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Find Events
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Contact Us
            </a> 
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src="https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt='/'
            width="600"
            height="600"/>
        </div>                
    </div>
</section>
        </>
    )
}