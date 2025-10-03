import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Navbar from './components/navbar';


function App() {
  

  return (
    <div className="App">
      <Navbar/>
      
      <Routes>
       
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
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
