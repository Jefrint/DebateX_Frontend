import React from 'react'
import Int_Article from '../components/Int_Article'
import Up_Debates from '../components/Up_Debates'
import DebateCard from '../components/DebateCard'
import ActiveDebateHeader from '../components/ActiveDebateHeader'
import PastDebates from '../components/PastDebates'
import DifferReactionBar from '../components/DifferReactionBar'


const Home = () => {
  return (

    <>
    
    <div>Home</div>
 <ActiveDebateHeader/>   
<DebateCard/>
<Int_Article/>
<Up_Debates/>
<PastDebates/>



    </>
  )
}

export default Home