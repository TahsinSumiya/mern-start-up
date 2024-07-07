import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({services}) => {
    const {_id,title,img,price,description} = services
    
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src={img}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{title}</h2>
    <p className='text-xl text-cyan-900'>${price}</p>
    <div className="card-actions"><Link to={`checkout/${_id}`}>    <button className="btn btn-outline btn-primary">book car</button></Link>

    </div>
  </div>
</div>
    </>
  )
}

export default ServiceCard
