import React from 'react'

import ActiveDebateHeader from '../components/ActiveDebateHeader'
import DifferReactionBar from "../components/DifferReactionBar"
import ReactionBar from "../components/ReactionBar"



const Home = () => {
  return (

    <>
    
    <div>Home</div>
    <ActiveDebateHeader/>   
  
    <ReactionBar />       {/* For Agree section */}
    <DifferReactionBar /> 

    </>
  )
}

export default Home