import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Navbar from './components/navbar';
import DebateCard from './components/DebateCard';
import PastDebates from "./components/PastDebates";
import Footer from "./components/Footer"; 

function App() {
  

  return (
    <div className="App">
      <Navbar/>
      
      
      <Routes>
       
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
