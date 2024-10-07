import React from 'react'
import Assistant from '../../Components/Assistant'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import Services from './Services'
import Partners from './Partners'
import Slider from './Slider'
import Layout from '../../Components/Layout/Layout'

function Home() {
  return (
    <Layout>
      <div className='w-full'>
          <Banner />
          <Services />
          <Partners />
          <Slider />
      </div>
    </Layout>
  )
}

export default Home