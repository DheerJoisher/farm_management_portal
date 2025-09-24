import './App.css'
import ForumPage from './pages/ForumPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RiskDashboard from './pages/RiskDashboard'; 
import RecordPage from "./pages/RecordPage"; 
import Education from "./pages/Education";


function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/risk-dashboard" element={<RiskDashboard />} />
        <Route path="/records" element={<RecordPage />} />
        <Route path="/education" element={<Education />} />

      </Routes>
  )
}

export default App
