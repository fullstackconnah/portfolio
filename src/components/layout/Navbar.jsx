import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AsciiTitle from '../common/AsciiTitle';

const asciiArt = [
  '    ______                        __         __         ',
  '   / ____/___  ____  ____  ____ _/ /_   ____/ /__ _   __',
  '  / /   / __ \\/ __ \\/ __ \\/ __ `/ __ \\ / __  / _ \\ | / /',
  ' / /___/ /_/ / / / / / / / /_/ / / / // /_/ /  __/ |/ / ',
  ' \\____/\\____/_/ /_/_/ /_/\\__,_/_/ /_(_)__,_/\\___/|___/  '
];

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / viewportHeight, 1);

      setScrollProgress(progress);
      setScrolled(progress > 0.1);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(true);
    }
  }, [isHomePage]);

  const handleLogout = () => {
    navigate('/admin');
    onLogout();
    setMenuOpen(false);
  };


  const offsetX = 280;
  const offsetY = 70;
  const mobileOffsetY = 100;

  const scrollToContent = () => {
    const contentElement = document.getElementById('main-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      { }
      {isHomePage && (
        <div
          className="fixed lg:hidden flex flex-col items-center space-y-3"
          style={{
            top: scrollProgress <= 0.3 ? '38vh' : `calc(38vh - ${((scrollProgress - 0.3) / 0.7) * 38}vh + ${(mobileOffsetY * ((scrollProgress - 0.3) / 0.7))}px)`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9998,
            transition: 'none',
            maxWidth: '90vw'
          }}
        >
          { }
          <div
            className="opacity-0 animate-crt-turn-on"
            style={{
              animationDelay: '0.1s',
              transition: 'none'
            }}
          >
            <AsciiTitle asciiArt={asciiArt} scrollProgress={scrollProgress} />
          </div>

          { }
          <div
            className="flex flex-col gap-2 items-center"
            style={{
              opacity: scrollProgress < 0.3 ? 1 - (scrollProgress / 0.3) : 0,
              transition: 'opacity 0.3s',
              visibility: scrollProgress >= 0.3 ? 'hidden' : 'visible',
              minWidth: 'max-content'
            }}
          >
            <button
              onClick={() => scrollToContent()}
              className="opacity-0 animate-crt-turn-on px-6 py-2 bg-transparent border-2 border-[#39FF14] text-[#39FF14] font-mono text-xs rounded-md hover:bg-[#39FF14] hover:text-black transition-all duration-300 shadow-[0_0_10px_#39FF14]/30 whitespace-nowrap"
              style={{ animationDelay: '0.5s' }}
            >
              &gt; Explore Portfolio
            </button>

            <a
              href="/projects"
              className="opacity-0 animate-crt-turn-on px-6 py-2 bg-transparent border-2 border-[#39FF14]/60 text-[#39FF14]/80 font-mono text-xs rounded-md hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-300 whitespace-nowrap"
              style={{ animationDelay: '0.7s' }}
            >
              &gt; View Projects
            </a>

            <a
              href="/services"
              className="opacity-0 animate-crt-turn-on px-6 py-2 bg-transparent border-2 border-[#39FF14]/60 text-[#39FF14]/80 font-mono text-xs rounded-md hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-300 whitespace-nowrap"
              style={{ animationDelay: '0.9s' }}
            >
              &gt; Services
            </a>
          </div>
        </div>
      )}

      { }
      {isHomePage && (
        <div
          className="fixed hidden lg:flex flex-col items-start space-y-8"
          style={{
            top: scrollProgress <= 0.3 ? '50vh' : `calc(50vh - ${((scrollProgress - 0.3) / 0.7) * 50}vh + ${(offsetY * ((scrollProgress - 0.3) / 0.7))}px)`,
            left: scrollProgress <= 0.3 ? '30%' : `calc(30vw - ${((scrollProgress - 0.3) / 0.7) * 30}vw + ${(offsetX * ((scrollProgress - 0.3) / 0.7))}px)`,
            transform: 'translate(-50%, -50%)',
            zIndex: 9998,
            transition: 'none',
            minWidth: 'max-content'
          }}
        >
          { }
          <div
            className="opacity-0 animate-crt-turn-on self-start"
            style={{
              animationDelay: '0.1s',
              transition: 'none'
            }}
          >
            <AsciiTitle asciiArt={asciiArt} scrollProgress={scrollProgress} />
          </div>

          { }
          <div
            className="flex flex-wrap gap-4 self-start"
            style={{
              opacity: scrollProgress < 0.3 ? 1 - (scrollProgress / 0.3) : 0,
              transition: 'opacity 0.3s',
              visibility: scrollProgress >= 0.3 ? 'hidden' : 'visible',
              minHeight: '48px',
              height: '48px',
              minWidth: 'max-content'
            }}
          >
            <button
              onClick={() => scrollToContent()}
              className="opacity-0 animate-crt-turn-on px-6 py-3 bg-transparent border-2 border-[#39FF14] text-[#39FF14] font-mono text-sm rounded-md hover:bg-[#39FF14] hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_#39FF14]/30 hover:shadow-[0_0_20px_#39FF14]/60"
              style={{ animationDelay: '0.5s' }}
            >
              &gt; Explore Portfolio
            </button>

            <a
              href="/projects"
              className="opacity-0 animate-crt-turn-on px-6 py-3 bg-transparent border-2 border-[#39FF14]/60 text-[#39FF14]/80 font-mono text-sm rounded-md hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: '0.7s' }}
            >
              &gt; View Projects
            </a>

            <a
              href="/services"
              className="opacity-0 animate-crt-turn-on px-6 py-3 bg-transparent border-2 border-[#39FF14]/60 text-[#39FF14]/80 font-mono text-sm rounded-md hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: '0.9s' }}
            >
              &gt; Services
            </a>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[9997] border-b border-[#39FF14] px-4 py-4 font-mono text-[#39FF14] text-sm shadow-md transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)'
        }}
      >
        <div className="flex justify-between items-center flex-wrap">
        <Link to="/" className="flex items-center">
          {isHomePage ? (
            <div style={{ width: '200px', height: '40px' }}>
              { }
            </div>
          ) : (
            <span className="text-[#39FF14] tracking-wide mb-2 lg:mb-0">
              ┌─[<span className="font-bold">
                {loggedIn ? 'admin@connah.dev' : 'guest@connah.dev'}
              </span>]──[~]
            </span>
          )}
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#39FF14] border border-[#39FF14] px-2 py-1 rounded hover:bg-[#39FF14] hover:text-black transition"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <div className={`w-full lg:w-auto lg:flex items-center gap-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mt-2 lg:mt-0 text-[#39FF14]">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`hover:underline transition-opacity duration-300 ${
                isHomePage && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className={`hover:underline transition-opacity duration-300 ${
                isHomePage && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              Services
            </Link>
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className={`hover:underline transition-opacity duration-300 ${
                isHomePage && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              Projects
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={`hover:underline transition-opacity duration-300 ${
                isHomePage && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              About
            </Link>

            {loggedIn && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={`hover:underline text-green-400 font-semibold transition-opacity duration-300 ${
                  isHomePage && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                Admin
              </Link>
            )}

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="mt-2 lg:mt-0 px-2 py-1 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 lg:mt-0 px-2 py-1 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;