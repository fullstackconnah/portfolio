import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 flex flex-col">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            {isLoggedIn && <Route path="/admin" element={<AdminDashboard />} />}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;