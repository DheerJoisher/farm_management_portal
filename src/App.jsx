import './App.css'
import ForumPage from './pages/ForumPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RiskDashboard from './pages/RiskDashboard'; 
import Services from './pages/Services';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/risk-dashboard" element={<RiskDashboard />} />
        <Route path="/services" element={<Services />} /> 
        

      </Routes>
  )
}

export default App
