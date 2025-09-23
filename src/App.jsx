import './App.css'
import ForumPage from './pages/ForumPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
  )
}

export default App
