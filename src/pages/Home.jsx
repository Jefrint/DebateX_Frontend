import React from 'react'

import CommentCard from '../components/CommentCard'
import ReactionBar from '../components/ReactionBar'
import DifferReactionBar from '../components/DifferReactionBar'
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