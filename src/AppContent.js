import { Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ParticlesBackground from './components/ParticlesBackground';


function AppContent({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      signOut(auth).then(() => {
        setIsLoggedIn(false);
        navigate('/');
      });
    };
  
    return (
      <div className="relative min-h-screen bg-white dark:bg-black transition-colors duration-300 flex flex-col overflow-hidden">
        {/* Global Background */}
        <ParticlesBackground />
  
        <Navbar loggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <div className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            {isLoggedIn && <Route path="/admin" element={<AdminDashboard />} />}
            <Route path="/admin" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AdminDashboard />
              </ProtectedRoute>} />
            <Route path="/projects/:id" element={<Projects />} />
          </Routes>
        </div>
  
        <Footer />
      </div>
    );
  }
  
export default AppContent;