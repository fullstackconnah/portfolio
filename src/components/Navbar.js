import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin');
    onLogout();
  }

    return (
      <nav className="bg-white dark:bg-[#121212] px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold text-blue-700 dark:text-white">Connah.dev</h1>
        <ul className="flex gap-6 text-gray-700 dark:text-gray-200">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
  
          {loggedIn && (
            <li>
              <Link to="/admin" className="text-blue-600 dark:text-blue-400 font-semibold">
                Admin
              </Link>
            </li>
          )}

          {loggedIn ? (
            <button
            onClick={handleLogout}
              className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Login
            </Link>
          )}
        </ul>
      </nav>
    );
  }

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default Navbar;
