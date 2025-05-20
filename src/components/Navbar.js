import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin');
    onLogout();
  }

  return (
    <nav className="z-50 bg-black border-b border-[#39FF14] px-4 py-2 font-mono text-[#39FF14] text-sm shadow-md">
      <div className="flex justify-between items-center">
      <span className="text-[#39FF14] tracking-wide">
        ┌─[<span className="font-bold">
          {loggedIn ? 'admin@connah.dev' : 'guest@connah.dev'}
        </span>]──[~]
      </span>
  
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
  
          {loggedIn && (
            <Link to="/admin" className="hover:underline text-green-400 font-semibold">
              Admin
            </Link>
          )}
  
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-2 py-1 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-2 py-1 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
  
      <div className="text-[#39FF14] mt-1">└────────────────────────────────────────</div>
    </nav>
  );
  
  }


export default Navbar;
