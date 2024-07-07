import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'

const Header = () => {
  const {user, logOut} = useContext(AuthContext)
  const handleLogout =()=>{
    logOut()
    .then('user logged out succesfully')
    .catch((e)=>console.log(e))
  }
    const navItem =<>
          <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link> </li>
       
        <li><Link to='/service'>Service</Link> </li>
        {
          user ? <> <li><Link to='/bookings'>Booking</Link> </li>
          <li><Link onClick={handleLogout}>LogOut</Link> </li>
          
           </> 
          :<li><Link to='/login'>Login</Link> </li> 
        }
        
    </>
  return (
    <>
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
{navItem}
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost text-xl">carnode</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
{navItem}
    </ul>
  </div>
  <div className="navbar-end">
  <button className="btn btn-outline">Default</button>
  </div>
</div>
    </>
  )
}

export default Header