import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Navbar from './components/navbar';
import ExploreDebates from './pages/ExploreDebates';
import Footer from "./components/Footer"; 
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from './pages/AdminDashboard';

function App() {
  

  return (
    <div className="App">
      <Navbar/>
      
      
      <Routes>
       
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exploredebates" element={<ExploreDebates />} />
         <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard/>} />

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
