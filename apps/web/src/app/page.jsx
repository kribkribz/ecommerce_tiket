import Image from 'next/image'
import styles from './page.module.css'
import Hero from '../components/hero'
import Link from 'next/link'
import moment from 'moment'
// import img1 from '../../../api/public/image/imageUpload-1706172493877-224155337.png'


const fetchProducts = async() => {
  try {
    const res = await fetch('http://localhost:8000/event/get', {
      method: 'GET',
      cache: 'no-store'
    })
    console.log(res)
    return res.json()
  } catch (error) {
    return error
  }
}

export default async function Home() {

  const {data: events} = await fetchProducts()
  

  return (
    <>
    <Hero heading='Event Hub' message='Find your events here'/>

    <div className='flex items-center gap-5 ml-[2rem] mt-[5rem]'>
      <div id='findevent' className='text-2xl'>
        Find Event In 
      </div>
      <div>
        <select className="ui fluid search dropdown" >
          <option value="AZ">Bandung</option>
          <option value="">Jakarta</option>
          <option value="AL">Tangerang</option>
        </select>
      </div>
    </div>

    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
      <button type="button" className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
      <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Workshop</button>
      <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Music</button>
      <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Seminar</button>
    </div>

            <Link href='/id'>
          <div className='flex justify-center'>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-5">

    {
      events?.map((item, index) =>{
        return(
          <div className="card w-64 bg-base-100 shadow-xl">
                <figure>
                  <Image src={`http://localhost:8000/public/image/${item?.eventImages[0]?.url}`} 
                  width={100} 
                  height={100} 
                  alt="My Image" 
                  />
                </figure>
                  <div className="card-body bg-white">
                    <h2 className="card-title">{item.name}</h2>
                    <p> {moment(item.date).format('dddd LL')}</p>
                    <p>Price : Rp. {item.price}</p>
                    <p>Available Seats: {item.availableSeats}</p>
                    <p>{item.location}</p>
                    <div className="card-actions justify-end">
                      <Link href='/BuyTickets'>
                      <button className="btn btn-primary ">Buy Now</button>
                      </Link>
                    </div>
                  </div>
              </div>
              )
            })
          }
      </div>
    </div>
          </Link>
    </>
  )
}
