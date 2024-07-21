import React from 'react'
import UserProfile from '../Account/UserProfile'
import Ads from '../Ads/ads'
import Products from '../Products/Products'

const HomePage = () => {
  return (
    <div className='flex  flex-col'>
        
        <Ads />
        <Products />
    </div>
  )
}

export default HomePage