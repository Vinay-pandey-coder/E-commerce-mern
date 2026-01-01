import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestsellers from '../components/Bestsellers'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestsellers/>
    </div>
  )
}

export default Home
