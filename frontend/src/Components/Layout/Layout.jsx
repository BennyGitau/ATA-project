import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Assistant from '../Assistant'

function Layout( {children} ) {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex flex-grow'>
            {children}
        </main>
        <Assistant />
        <Footer />
    </div>
  )
}

export default Layout