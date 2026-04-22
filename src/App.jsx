import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import ExploreDebates from './pages/ExploreDebates';
import Footer from "./components/Footer"; 
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import CommentPage from "./pages/CommentPage"
import AdminDashboard from './pages/AdminDashboard';
import DebateDetails from './pages/DebateDetails';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/debates/:debateId" element={<CommentPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ExploreDebates />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/debate/:id" element={<DebateDetails />} />
        </Routes>
      </main>

      <Footer />
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
