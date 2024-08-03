import React from 'react'
import UserProfile from '../Account/UserProfile'
import Ads from '../Ads/ads'
import Products from '../Products/Products'
import TrendingProducts from '../Products/TrendingProducts'

const HomePage = () => {
  return (
    <div className='flex  flex-col'>
        
        <Ads />
        <TrendingProducts />
        <Products />
    </div>
  )
}

export default HomePage