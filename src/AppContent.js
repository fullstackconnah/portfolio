import { Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from 'react';

import './css/doomScreenTear.css';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BackgroundEffects from './components/BackgroundEffects';
import BootSplash from './components/BootSplash';
import NotFound from './pages/404.jsx';
import ScreenShatter from './components/ScreenShatter';
import AboutPage from './pages/About.jsx';
import ProjectsPage from './pages/Projects.jsx';
import ServicesPage from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';


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
              <BackgroundEffects />
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
                <Route path="/admin" element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                <Route path='/about' element={<AboutPage />}/>
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<ServicesPage />} />
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
