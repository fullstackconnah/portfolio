import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { use3DTilt } from '../../hooks/use3DTilt';
import { useState, useEffect } from 'react';
import { FaCode, FaCloud, FaHeadset, FaShoppingCart, FaNetworkWired, FaShieldAlt } from 'react-icons/fa';

export default function ServicesSnapshotSection() {
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.3 });
  const [tiltRef, tiltStyle, glareStyle] = use3DTilt({ maxTilt: 5, scale: 1.01 });
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    { name: 'Custom Websites', icon: FaCode, desc: 'A professional website that attracts customers' },
    { name: 'AI Solutions', icon: FaCloud, desc: 'Smart tools to automate and grow your business' },
    { name: 'Friendly Support', icon: FaHeadset, desc: 'Real help when you need it, in plain English' },
    { name: 'Online Shop', icon: FaShoppingCart, desc: 'Sell your products online easily' },
    { name: 'Office Setup', icon: FaNetworkWired, desc: 'Get your team connected and working' },
    { name: 'Peace of Mind', icon: FaShieldAlt, desc: 'Your business data stays safe and secure' }
  ];


  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [inView, services.length]);

  return (
    <div
      ref={scrollRef}
      className={`scroll-fade-in ${inView ? 'in-view' : ''} h-full`}
    >
      <div
        ref={tiltRef}
        className="h-full relative"
        style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
      >
        <section
          className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden h-full flex flex-col"
        >
          { }
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              ...glareStyle,
              mixBlendMode: 'overlay',
              zIndex: 100
            }}
          />

          { }
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-4 py-2.5 flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2">
              <span className="text-[#39FF14] text-sm font-bold">HOW I CAN HELP YOUR BUSINESS</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse"></div>
              <span className="text-[#39FF14]/70 text-xs font-mono">{services.length} services</span>
            </div>
          </div>

          {/* Enhanced vertical layout for better space utilization */}
          <div className="flex-1 p-6 flex flex-col relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 pointer-events-none">
                <span className="text-[#39FF14]/80 text-sm">Services for Small Business Owners</span>
              </div>
              <Link
                to="/services"
                className="flex items-center space-x-2 bg-transparent border border-[#39FF14]/40 px-4 py-2 rounded text-[#39FF14] text-sm font-mono transition-all duration-300 hover:border-[#39FF14] hover:bg-[#39FF14]/10 group pointer-events-auto"
              >
                <span>View All</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Featured service header - larger */}
            <div className="mb-6 border-l-4 border-[#39FF14] pl-6 pointer-events-none">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-[#39FF14] text-2xl">◉</span>
                <h3 className="text-[#39FF14] text-xl font-bold">
                  {services[activeIndex].name}
                </h3>
              </div>
              <p className="text-[#39FF14]/70 text-sm">
                {services[activeIndex].desc}
              </p>
            </div>

            {/* 3x2 grid of services with larger cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pointer-events-auto flex-1">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                      index === activeIndex
                        ? 'bg-[#39FF14]/10 border-[#39FF14] shadow-[0_0_15px_#39FF14]/40'
                        : 'border-[#39FF14]/30 hover:border-[#39FF14]/60 hover:bg-[#39FF14]/5'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      animation: inView ? `fadeInUp 0.3s ease-out ${index * 0.08}s both` : 'none'
                    }}
                  >
                    <Icon className={`text-3xl mb-3 transition-transform ${
                      index === activeIndex ? 'text-[#39FF14] scale-110' : 'text-[#39FF14]/60'
                    }`} />
                    <span className={`text-sm font-mono text-center transition-colors ${
                      index === activeIndex ? 'text-[#39FF14] font-bold' : 'text-[#39FF14]/70'
                    }`}>
                      {service.name}
                    </span>
                    <span className={`text-xs font-mono text-center mt-1 transition-colors ${
                      index === activeIndex ? 'text-[#39FF14]/80' : 'text-[#39FF14]/40'
                    }`}>
                      {service.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}