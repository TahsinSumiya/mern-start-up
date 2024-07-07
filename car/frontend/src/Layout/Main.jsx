import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/footer/Footer'
import Header from '../shared/header/Header'

const Main = () => {
  return (
    <div>
        <Header/>
        <Outlet></Outlet>
        <Footer/>
    </div>
  )
}

export default Main