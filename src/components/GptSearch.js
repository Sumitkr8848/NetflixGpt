import React from 'react'
import GptSearchBar from './GptSearchBar'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    
    <div >
        <div className='fixed -z-10'>
            <img src={BG_URL} alt="BG Logo"/>
        </div>
      
      <GptSearchBar/>
      GptMovieSuggestion
    </div>
  )
}

export default GptSearch
