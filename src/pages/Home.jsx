import React from 'react'

import CommentCard from '../components/CommentCard'
import ReactionBar from '../components/ReactionBar'
import DifferReactionBar from '../components/DifferReactionBar'
import ActiveDebateHeader from '../components/ActiveDebateHeader'
import DebateCard from '../components/DebateCard'



const Home = () => {
  return (

    <>
    
    <div>Home</div>
    <ActiveDebateHeader/>
  
    <ReactionBar/>

    <DifferReactionBar/>
    
    <CommentCard/>
   
  

    </>
  )
}

export default Home