import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav style={{ ...styles.nav, background: darkMode ? '#222' : '#eee', color: darkMode ? '#fff' : '#000' }}>
      <div style={styles.logo}>Connah.dev</div>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/projects" style={styles.link}>Projects</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        <li>
        <button className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} onClick={toggleTheme}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        </li>
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
