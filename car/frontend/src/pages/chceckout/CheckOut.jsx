import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'

const CheckOut = () => {
    const getData = useLoaderData()
    const {_id,title,price,img}=getData
const {user} =useContext(AuthContext)
    const handleSubmit =(e)=>{
e.preventDefault()
const form = e.target;
const name = form.name.value;
const date = form.date.value;
const email = user?.email;
const amount = price;

const order ={
    name:name,
    email:email,
    date:date,
    img:img,
    title:title,
    amount:amount,
    service_id:_id
}

fetch('http://localhost:4000/bookings',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(order)
})
.then((res)=>{res.json()})
.then(data=>console.log(data))
    }
  return (
    <>
    <div className="hero bg-base-200 min-h-screen">

  
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name'defaultValue={user?.displayName} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" name='date' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' defaultValue={user?.email} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due amount</span>
          </label>
       
          <input type="text"  defaultValue={'$'+price} name='amount' className="input input-bordered" readOnly/>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>

    </>
  )
}

export default CheckOut