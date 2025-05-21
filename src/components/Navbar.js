import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/admin');
    onLogout();
    setMenuOpen(false);
  };

  return (
    <nav className="z-50 bg-black border-b border-[#39FF14] px-4 py-2 font-mono text-[#39FF14] text-sm shadow-md">
      <div className="flex justify-between items-center flex-wrap">
        <span className="text-[#39FF14] tracking-wide mb-2 sm:mb-0">
          ┌─[<span className="font-bold">
            {loggedIn ? 'admin@connah.dev' : 'guest@connah.dev'}
          </span>]──[~]
        </span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-[#39FF14] border border-[#39FF14] px-2 py-1 rounded hover:bg-[#39FF14] hover:text-black transition"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <div className={`w-full sm:w-auto sm:flex items-center gap-4 ${menuOpen ? 'block' : 'hidden'} sm:block`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 sm:mt-0 text-[#39FF14]">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="hover:underline">Projects</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:underline">About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:underline">Contact</Link>

            {loggedIn && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:underline text-green-400 font-semibold">
                Admin
              </Link>
            )}

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="mt-2 sm:mt-0 px-2 py-1 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 sm:mt-0 px-2 py-1 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="text-[#39FF14] mt-1 hidden sm:block">└────────────────────────────────────────</div>
    </nav>
  );
}

export default Navbar;