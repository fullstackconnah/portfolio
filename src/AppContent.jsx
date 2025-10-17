import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';
import { useState, lazy, Suspense } from 'react';

import './css/doomScreenTear.css';
import './css/crtEffects.css';
import './css/analogStatic.css';

import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import BackgroundEffects from './components/features/effects/BackgroundEffects.jsx';
import CRTOverlay from './components/features/effects/CRTOverlay.jsx';
import EnhancedBootSplash from './components/features/effects/EnhancedBootSplash.jsx';
import ScreenShatter from './components/features/effects/ScreenShatter.jsx';

// Lazy load route components for code splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const ProtectedRoute = lazy(() => import('./components/features/auth/ProtectedRoute.jsx'));
const NotFound = lazy(() => import('./pages/404.jsx'));
const AboutPage = lazy(() => import('./pages/About.jsx'));
const ProjectsPage = lazy(() => import('./pages/Projects.jsx'));
const ServicesPage = lazy(() => import('./pages/Services.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-[#39FF14] font-mono text-xl animate-pulse">
      Loading...
    </div>
  </div>
);

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Check if current page is 404
  const is404Page = !['/', '/login', '/admin', '/about', '/projects', '/contact', '/services'].includes(location.pathname) && !location.pathname.startsWith('/projects/');
  return (
    <div className={`group doom-container ${isTearing ? 'doom-tear' : ''}`}>
      <div className="relative min-h-screen bg-black flex flex-col overflow-hidden transition-colors duration-300">
        {showBootSplash ? (
          <EnhancedBootSplash onFinish={() => {
            localStorage.setItem('bootPlayed', 'true');
            setShowBootSplash(false);
          }} />
        ) : (
          <>
            {!is404Page && (
              <div className="fixed inset-0 z-0 pointer-events-none">
                <BackgroundEffects />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,#39FF1433_98%,transparent_100%)] bg-[length:100%_2px] animate-scanlines opacity-10" />
                <CRTOverlay />
              </div>
            )}

            <Navbar loggedIn={isLoggedIn} onLogout={handleLogout} />

            <div className="flex-grow relative z-10 pt-16">
              <Suspense fallback={<LoadingFallback />}>
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
                  } />                  <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
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
              </Suspense>
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
