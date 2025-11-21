import { useState, useEffect, useMemo } from 'react';
import '../../css/heroGlitch.css';
import WireframeGlobe from '../features/effects/WireframeGlobe';

export default function HeroSection({ onReboot, setIsTearing, setIsShattering }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [lastScrollProgress, setLastScrollProgress] = useState(0);
  const [lastSnapTime, setLastSnapTime] = useState(0);
  const [typedService, setTypedService] = useState('');
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const services = useMemo(() => [
    'Growing Your Business Online',
    'Making Technology Work For You',
    'Professional Websites That Convert',
    'Reliable Tech Support When You Need It',
    'Secure & Fast Online Solutions',
    'Your Business Success Partner'
  ], []);


  useEffect(() => {
    const currentService = services[serviceIndex];

    let delay = isDeleting ? 50 : 100;


    if (!isDeleting && typedService.length === currentService.length) {
      delay = 2000;
    } else if (isDeleting && typedService.length === 0) {
      delay = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {

        if (typedService.length < currentService.length) {
          setTypedService(currentService.substring(0, typedService.length + 1));
        } else {

          setIsDeleting(true);
        }
      } else {

        if (typedService.length > 0) {
          setTypedService(currentService.substring(0, typedService.length - 1));
        } else {

          setIsDeleting(false);
          setServiceIndex((prev) => (prev + 1) % services.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [typedService, isDeleting, serviceIndex, services]);

  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / viewportHeight, 1);

      setLastScrollProgress(scrollProgress);
      setScrollProgress(progress);


      setButtonsHidden(progress >= 0.3);


      if (progress >= 0.3) {
        setHasScrolledDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress, isAutoScrolling]);


  useEffect(() => {
    if (isAutoScrolling) return;

    const now = Date.now();
    const timeSinceLastSnap = now - lastSnapTime;


    if (timeSinceLastSnap < 1500) return;

    const isScrollingDown = scrollProgress > lastScrollProgress;
    const isScrollingUp = scrollProgress < lastScrollProgress;


    const bentoGrid = document.getElementById('bento-grid');
    const bentoInView = bentoGrid && bentoGrid.getBoundingClientRect().top < window.innerHeight * 0.8;


    if (bentoInView && isScrollingDown) return;


    if (scrollProgress >= 0.3 && scrollProgress <= 1.0) {

      if (isScrollingDown) {
        setIsAutoScrolling(true);
        setLastSnapTime(now);

        const contentElement = document.getElementById('main-content');
        if (contentElement) {
          const elementPosition = contentElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - (window.innerHeight * 0.15);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          setTimeout(() => setIsAutoScrolling(false), 1000);
        }
      }

      else if (isScrollingUp) {
        setIsAutoScrolling(true);
        setLastSnapTime(now);

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        setTimeout(() => setIsAutoScrolling(false), 1000);
      }
    }
  }, [scrollProgress, lastScrollProgress, isAutoScrolling, lastSnapTime]);


  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    if (scrollProgress < 0.3) {

      mainContent.style.visibility = 'hidden';
      mainContent.style.pointerEvents = 'none';
    } else {

      mainContent.style.visibility = 'visible';
      mainContent.style.pointerEvents = 'auto';
    }
  }, [scrollProgress]);

  const scrollToContent = () => {
    const contentElement = document.getElementById('main-content');
    if (contentElement) {
      const elementPosition = contentElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (window.innerHeight * 0.10);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-[130vh] flex flex-col justify-center text-[#39FF14] font-mono px-4">

      { }
      <div
        className="fixed hidden lg:block"
        style={{
          top: '50vh',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9996,
          opacity: scrollProgress >= 0.3 ? 0 : 1,
          transition: hasScrolledDown ? 'opacity 0.3s ease-out' : 'none',
          pointerEvents: 'none'
        }}
      >
        <WireframeGlobe />
      </div>

      { }
      <div
        className="fixed lg:hidden"
        style={{
          top: scrollProgress <= 0.3 ? 'calc(38vh + 20px)' : `calc(38vh - ${((scrollProgress - 0.3) / 0.7) * 38}vh + ${(150 * ((scrollProgress - 0.3) / 0.7))}px + 20px)`,
          left: 'calc(50% + 15px)',
          transform: 'translate(-50%, -50%) scale(0.9)',
          zIndex: 9995,
          opacity: scrollProgress >= 0.3 ? 0 : 1,
          transition: hasScrolledDown ? 'opacity 0.3s ease-out' : 'none',
          pointerEvents: 'none',
          width: '350px',
          height: '350px'
        }}
      >
        <WireframeGlobe />
      </div>

      { }
      <div
        className="fixed hidden lg:flex flex-col space-y-6 text-right"
        style={{
          top: '50vh',
          right: '10%',
          transform: 'translateY(-50%)',
          zIndex: 9998,
          minWidth: 'max-content',
          opacity: scrollProgress >= 0.3 ? 0 : 1,
          transition: hasScrolledDown ? 'opacity 0.3s ease-out' : 'none',
          pointerEvents: buttonsHidden ? 'none' : 'auto'
        }}
      >
        <div
          className={`space-y-8 ${!hasScrolledDown ? 'opacity-0 animate-crt-turn-on' : ''}`}
          style={{
            animationDelay: !hasScrolledDown ? '1.1s' : '0s'
          }}
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#39FF14]">Technology That Works For You</h2>
            <p className="text-[#39FF14]/70 text-sm">Simple, Reliable Solutions for Small Business Growth</p>
          </div>

          <div className="space-y-3">
            <div className="text-lg text-[#39FF14] min-h-[28px] flex items-center justify-end font-mono">
              <span>
                {typedService}
                <span className="animate-pulse ml-1">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      { }
      <div
        className="fixed lg:hidden flex flex-col items-center text-center px-4"
        style={{
          top: '60vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9998,
          width: '100%',
          maxWidth: '320px',
          opacity: scrollProgress >= 0.3 ? 0 : 1,
          transition: hasScrolledDown ? 'opacity 0.3s ease-out' : 'none',
          pointerEvents: buttonsHidden ? 'none' : 'auto'
        }}
      >
        <div
          className={`space-y-3 ${!hasScrolledDown ? 'opacity-0 animate-crt-turn-on' : ''}`}
          style={{
            animationDelay: !hasScrolledDown ? '1.1s' : '0s'
          }}
        >
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#39FF14]">Technology That Works For You</h2>
            <p className="text-[#39FF14]/70 text-xs">Simple, Reliable Solutions for Small Business Growth</p>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-[#39FF14] min-h-[20px] flex items-center justify-center font-mono">
              <span>
                {typedService}
                <span className="animate-pulse ml-1">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      { }
      <div
        className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-9998"
        style={{
          opacity: scrollProgress >= 0.3 ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: buttonsHidden ? 'none' : 'auto'
        }}
      >
        <button
          onClick={scrollToContent}
          className="animate-slow-bounce cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="text-center">
            <div className="text-[#39FF14]/70 group-hover:text-[#39FF14] transition-colors duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6 1.41-1.41z"/>
              </svg>
              <div className="text-xs sm:text-sm font-mono">Scroll Down</div>
            </div>
          </div>
        </button>
      </div>

    </section>
  );
}