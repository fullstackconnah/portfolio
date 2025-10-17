import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { use3DTilt } from '../../hooks/use3DTilt';

export default function QuickStatsTerminal() {
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.3 });
  const [tiltRef, tiltStyle, glareStyle] = use3DTilt({ maxTilt: 5, scale: 1.01 });
  const [stats, setStats] = useState({
    experience: 0,
    projects: 0,
    techCount: 0
  });

  useEffect(() => {
    if (!inView) return;

    const targets = {
      experience: 5,
      projects: 12,
      techCount: 25
    };

    const duration = 1500;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        experience: Math.floor(targets.experience * progress),
        projects: Math.floor(targets.projects * progress),
        techCount: Math.floor(targets.techCount * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={scrollRef}
      className={`scroll-scale-in ${inView ? 'in-view' : ''}`}
    >
      <div
        ref={tiltRef}
        className="h-full"
        style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
      >
        <section
          className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden h-full"
        >
          { }
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              ...glareStyle,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-4 py-2 flex items-center justify-between relative z-10">
          <span className="text-[#39FF14]/80 text-sm">stats.sys</span>
          <span className="text-[#39FF14]/60 text-xs">realtime</span>
        </div>

        <div className="p-4 flex flex-col h-full relative z-10">
          <div className="flex items-center mb-3">
            <span className="text-[#39FF14] mr-2 text-sm">$</span>
            <span className="text-[#39FF14]/80 text-xs">sys --info</span>
          </div>

          {/* Horizontal stats layout */}
          <div className="flex-1 flex items-center justify-between gap-3">
            {/* Experience */}
            <div className="flex-1 text-center">
              <div className="text-[#39FF14]/60 text-xs mb-1">Experience</div>
              <div className="text-[#39FF14] text-3xl font-bold tabular-nums">
                {stats.experience}+
              </div>
              <div className="text-[#39FF14]/60 text-xs mt-1">years</div>
            </div>

            <div className="w-px h-16 bg-[#39FF14]/20"></div>

            {/* Projects */}
            <div className="flex-1 text-center">
              <div className="text-[#39FF14]/60 text-xs mb-1">Projects</div>
              <div className="text-[#39FF14] text-3xl font-bold tabular-nums">
                {stats.projects}+
              </div>
              <div className="text-[#39FF14]/60 text-xs mt-1">active</div>
            </div>

            <div className="w-px h-16 bg-[#39FF14]/20"></div>

            {/* Tech Stack */}
            <div className="flex-1 text-center">
              <div className="text-[#39FF14]/60 text-xs mb-1">Tech Stack</div>
              <div className="text-[#39FF14] text-3xl font-bold tabular-nums">
                {stats.techCount}+
              </div>
              <div className="text-[#39FF14]/60 text-xs mt-1">technologies</div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#39FF14]/20">
            <div className="text-[#39FF14]/60 text-xs flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
              <span>Status: Online</span>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
