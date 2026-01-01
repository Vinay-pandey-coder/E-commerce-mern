import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestsellers from '../components/Bestsellers'
import OurPolicey from '../components/OurPolicey'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestsellers/>
      <OurPolicey/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
