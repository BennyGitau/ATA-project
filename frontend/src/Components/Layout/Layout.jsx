import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Assistant from '../Assistant'

function Layout() {
  return (
    <div>
        <Header />
        <main>
            <Outlet />
        </main>
        <Assistant />
        <Footer />
    </div>
  )
}

export default Layout