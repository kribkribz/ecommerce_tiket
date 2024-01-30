'use client'
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import toast, {Toaster} from "react-hot-toast";


export default function Page () {

    const [data, setData] = useState({})
    const [tabOpen, setTabOpen] = useState(null)

    const fetchData = async() => {
        try {
            const res = await axios.get('http://localhost:8000/event/get', {
                method: 'GET',
                cache: 'no-store'
              })

              setData(res.data)
              console.log(res)
            setTabOpen(res.data.name)
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeTabOpen = (e) => {
        setTabOpen(data[e.target.getAttribute('name')])
    }

    useEffect(() => {
        fetchData()
    }, [])

    const[number, setNumber] = useState(0)
    const onDecrement = () => {
        if(number > 0) setNumber(number-1)
    }
    const onIncrement = () => {
        if(number < 4) setNumber(number+1)
    }
    const onSubmit = () =>{
        toast.success ('Buy Success')
    }

    return(
        <>
        <div className="mt-[8rem] flex items-center justify-center">
            <img src='https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240104215517_6596c6d5ec527.jpg'/>
        <div className="flex justify-center items-center mt-[2rem] ">
            <div className="text-center ml-[10rem]">
                <div className="card w-96 bg-white shadow-xl">
                    <div className="card-body">
                      
                        <h2 className="card-title">Vibe-rator : Jamming with TayNiki</h2>
                            <p>Wednesday, 20 February 2024</p>
                            <p>IDR 150.000</p>
                            <p>Jakarta</p>
                            <div className="flex items-center mb-3">
                                <button onClick={onDecrement}> 
                                    <CiCircleMinus className="text-[3rem] ml-[4rem] "/>
                                </button>
                                <p className="text-3xl"> {number} </p> 
                                <button onClick={onIncrement}>
                                    <CiCirclePlus className="text-[3rem] mr-[4rem]"/> 
                                </button>
                            </div>
                        <button onClick={onSubmit} className="btn bg-green-500 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg">Buy Ticket</button>
                        <Toaster/>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>


        <div>
            {console.log(data)}
            <div className="flex justify-center gap-10 py-10">
                <div name='description' onClick={(e) => onChangeTabOpen(e)} className="bg-blue-300 px-3 rounded-md">
                    Description 
                </div>
                <div name='tickets' onClick={(e) => onChangeTabOpen(e)} className="bg-blue-500 px-3 rounded-md">
                    Tickets 
                </div>
            </div>
            <div>
                {
                  typeof tabOpen === 'string'?
                        tabOpen
                    :
                        typeof tabOpen === 'object'?
                            tabOpen?.map((item) => {
                                return(
                                    <div>
                                        {item.category}
                                    </div>
                                )
                            })
                        :
                            null
                }
            </div>
        </div>
        </>
    )
}