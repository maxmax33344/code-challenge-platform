import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChallengeView from './components/ChallengeView';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Challenges from './pages/Challenges';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeView/>} />
      </Routes>
    </Router>
  );
}

export default App;
