import { Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MatrixRain from './components/BackgroundEffects';
import BootSplash from './components/BootSplash';
import NotFound from './pages/404';
import ScreenShatter from './components/ScreenShatter';
import './css/doomScreenTear.css';

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isTearing, setIsTearing] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const [showBootSplash, setShowBootSplash] = useState(() => {
    return localStorage.getItem('bootPlayed') !== 'true';
  });

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      navigate('/');
    });
  };

  return (
    <div className={`group doom-container ${isTearing ? 'doom-tear' : ''}`}>
      <div className="relative min-h-screen bg-black flex flex-col overflow-hidden transition-colors duration-300">
        {showBootSplash ? (
          <BootSplash onFinish={() => {
            localStorage.setItem('bootPlayed', 'true');
            setShowBootSplash(false);
          }} />
        ) : (
          <>
            <div className="fixed inset-0 z-0 pointer-events-none">
              <MatrixRain />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,#39FF1433_98%,transparent_100%)] bg-[length:100%_2px] animate-scanlines opacity-10" />
            </div>

            <Navbar loggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className="flex-grow relative z-10">
              <Routes>
                <Route path="/" element={
                  <Home
                    onReboot={() => {
                      localStorage.removeItem('bootPlayed');
                      setShowBootSplash(true);
                    }}
                    setIsTearing={setIsTearing}
                    setIsShattering={setIsShattering}
                  />
                } />
                <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                {isLoggedIn && <Route path="/admin" element={<AdminDashboard />} />}
                <Route path="/admin" element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/projects/:id" element={<Projects />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>

      {isShattering && (
        <ScreenShatter onComplete={() => {
          setIsShattering(false);
          localStorage.removeItem('bootPlayed');
          setShowBootSplash(true);
        }} />
      )}
    </div>
  );
}

export default AppContent;
