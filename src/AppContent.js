import { Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 flex flex-col">
      <Navbar loggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          {isLoggedIn && <Route path="/admin" element={<AdminDashboard />} />}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default AppContent;