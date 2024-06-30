import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-end mx-10'>

        <NavLink to='/' className='mx-5'>home</NavLink>
        <NavLink to='/login' className='mx-5'>login</NavLink>
        <NavLink to='/signup' className='mx-5'>signup</NavLink>
        <NavLink to='/addCoffee' className='mx-5'>add coffee</NavLink>
        <NavLink to='/getuser' className='mx-5'>users</NavLink>
    </div>
  )
}

export default Header