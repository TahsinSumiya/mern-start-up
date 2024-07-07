import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'

const Service = () => {
    const [service,setService]=useState([])
    useEffect(()=>{
fetch('http://localhost:4000/services').then(res=>res.json()).then(data=>setService(data))
    },[])
  return (
    <div>
      <div className='mt-4 text-center'>
        <h2 className='text-cyan-950 text-4xl text-center font-bold'>Our Services</h2>
        <p className='text-cyan-950  text-center  '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis labore vitae aspernatur enim nesciunt nulla</p>
<div className='flex justify-center items-center'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
{service.map((services)=>(
<ServiceCard key={service._id} services={services}/>
))}
        </div>
            
</div>
      </div>
    </div>
  )
}

export default Service
