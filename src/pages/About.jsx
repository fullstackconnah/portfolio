import AsciiTitle from '../components/common/AsciiTitle.jsx';
import { useNavigate } from 'react-router-dom';
import '../css/TerminalCard.css';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';



const asciiArt = [
  '    ____  ____  ____  ____________    ______  _______  __ ______',
  '   / __ \\/ __ \\/ __ \\/ ____/  _/ /   / ____/ / ____/ |/ // ____/',
  '  / /_/ / /_/ / / / / /_   / // /   / __/   / __/  |   // __/   ',
  ' / ____/ _, _/ /_/ / __/ _/ // /___/ /____ / /___ /   |/ /___   ',
  '/_/   /_/ |_|\\____/_/   /___/_____/_____(_)_____//_/|_/_____/   '
];

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
        <>
      <Helmet>
        <title>About | Connah.dev</title>
        <meta name="description" content="Get to know Connah Trotman, a full-stack developer experienced in .NET, Angular, SQL, and immersive terminal UI design." />
      </Helmet>
      <div className="min-h-screen text-[#39FF14] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

      <div className="mb-10">
        <AsciiTitle asciiArt={asciiArt} />
      </div>

      <p
        onClick={() => navigate(-1)}
        className="text-green-400 font-mono text-sm underline cursor-pointer hover:text-[#39FF14] transition mb-6"
      >
        &gt; return
      </p>

      <div className="space-y-12">
        <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
            <span className="text-[#39FF14]/80 text-sm">whoami.txt</span>
          </div>
          <div className="p-8">
            <div className="flex items-center mb-6">
              <span className="text-[#39FF14] mr-2 text-lg">$</span>
              <span className="text-[#39FF14]/80 text-base">cat whoami.txt</span>
            </div>
            <div className="bg-black/30 border-l-4 border-[#39FF14]/60 pl-6 py-4">
              <p className="text-[#39FF14] text-xl leading-relaxed font-medium">
                Full-stack software developer with a strong foundation in frontend and backend technologies.
              </p>
              <p className="text-[#39FF14]/90 text-lg leading-relaxed mt-3">
                Hands-on leadership experience in robotics, and a passion for crafting polished, immersive user interfaces.
              </p>
            </div>
          </div>
        </section>

        { }
        <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
            <span className="text-[#39FF14]/80 text-sm">bio.md</span>
          </div>
          <div className="p-8">
            <div className="flex items-center mb-8">
              <span className="text-[#39FF14] mr-2 text-lg">$</span>
              <span className="text-[#39FF14]/80 text-base">markdown bio.md</span>
            </div>
            <div className="space-y-6 text-base leading-relaxed">
              <p className="text-[#39FF14]/90">
                I'm a software developer with over 3 years of experience building scalable, secure applications in{' '}
                <span className="text-[#39FF14] font-semibold">.NET</span> environments. My expertise includes{' '}
                <span className="text-[#39FF14] font-semibold">Angular</span>,{' '}
                <span className="text-[#39FF14] font-semibold">Blazor</span>, and{' '}
                <span className="text-[#39FF14] font-semibold">SQL</span>, with strong exposure to cloud platforms like{' '}
                <span className="text-[#39FF14] font-semibold">Azure</span> and{' '}
                <span className="text-[#39FF14] font-semibold">Firebase</span>.
              </p>

              <p className="text-[#39FF14]/90">
                I've contributed to enterprise systems at Netwealth Investments, led end-to-end delivery of media-heavy web applications at SmartScaff, and built NDIS-compliant solutions for the disability care sector. My background in robotics and game dev has shaped a mindset that's both analytical and creative.
              </p>

              <p className="text-[#39FF14]/90">
                From multi-tier architecture and microservices to UI polish and terminal interfaces — I bring ideas to life with clean code and purposeful design.
              </p>
            </div>
          </div>
        </section>

        {/* Career History Section */}
        <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
            <span className="text-[#39FF14]/80 text-sm">career-history.log</span>
            <span className="text-[#39FF14]/60 text-xs">5 entries</span>
          </div>
          <div className="p-8">
            <div className="flex items-center mb-8">
              <span className="text-[#39FF14] mr-2 text-lg">$</span>
              <span className="text-[#39FF14]/80 text-base">tail -f career-history.log</span>
            </div>
            <div className="space-y-6">
              {[
                {
                  year: '2017–2018',
                  event: 'Led national-level robotics team; developed control firmware and autonomous routines',
                  status: 'LEAD'
                },
                {
                  year: '2021',
                  event: 'Built scaffold logistics platform (Blazor + .NET + SQL) for SmartScaff\'s internal operations',
                  status: 'BUILD'
                },
                {
                  year: '2022–2025',
                  event: 'Developed and maintained enterprise investment systems at Netwealth using .NET Core, T-SQL, Angular, and Azure DevOps',
                  status: 'ENTERPRISE'
                },
                {
                  year: '2025',
                  event: 'Delivered advanced holiday filtering and content platform for NDIS services (WordPress + Pods)',
                  status: 'DEPLOY'
                },
                {
                  year: '2025',
                  event: 'Created this retro-terminal portfolio using React, Firebase, and TailwindCSS with real-time admin editing',
                  status: 'CURRENT'
                }
              ].map((entry, index) => (
                <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-5 hover:border-[#39FF14]/40 transition-colors">
                  <div className="flex items-start space-x-4">
                    <span className="text-[#39FF14]/70 text-sm font-mono bg-[#39FF14]/10 px-3 py-1 rounded">
                      [{entry.status}]
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-[#39FF14] font-bold text-base">{entry.year}</span>
                      </div>
                      <p className="text-[#39FF14]/90 text-base leading-relaxed">{entry.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        { }
        <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
            <span className="text-[#39FF14]/80 text-sm">dev-stats.json</span>
          </div>
          <div className="p-8">
            <div className="flex items-center mb-8">
              <span className="text-[#39FF14] mr-2 text-lg">$</span>
              <span className="text-[#39FF14]/80 text-base">node -p "JSON.stringify(stats, null, 2)"</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Years of coding: 8+',
                'Enterprise projects shipped: 12+',
                'Frameworks deployed: Angular, Blazor, .NET, React',
                'Systems debugged: many — including one robot fire 🔥'
              ].map((stat, index) => (
                <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-5 hover:border-[#39FF14]/40 transition-colors">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#39FF14]/70 text-sm font-mono bg-[#39FF14]/10 px-2 py-1 rounded">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[#39FF14]/90 text-base">{stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        { }
        <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
            <span className="text-[#39FF14]/80 text-sm">soft-skills.yml</span>
          </div>
          <div className="p-8">
            <div className="flex items-center mb-8">
              <span className="text-[#39FF14] mr-2 text-lg">$</span>
              <span className="text-[#39FF14]/80 text-base">cat soft-skills.yml</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Collaborative and clear communicator',
                'Agile & hybrid delivery experience',
                'Problem-solving under tight deadlines',
                'Test-driven development & clean code mindset',
                'Client engagement and stakeholder feedback integration'
              ].map((skill, index) => (
                <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-5 hover:border-[#39FF14]/40 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#39FF14]/20 border border-[#39FF14] rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-[#39FF14] text-lg">✓</span>
                    </div>
                    <span className="text-[#39FF14]/90 text-base leading-relaxed">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        { }
        <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
            <span className="text-[#39FF14]/80 text-sm">system-metrics.cfg</span>
          </div>
          <div className="p-8">
            <div className="flex items-center mb-8">
              <span className="text-[#39FF14] mr-2 text-lg">$</span>
              <span className="text-[#39FF14]/80 text-base">systemctl status developer.service</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/30 border-2 border-[#39FF14]/30 rounded-lg p-6 hover:border-[#39FF14]/50 transition-colors">
                <h3 className="text-[#39FF14] font-bold text-lg mb-4 border-b border-[#39FF14]/30 pb-2">Core System</h3>
                <div className="space-y-2 text-[#39FF14]/90">
                  <p><span className="text-[#39FF14]/70">OS:</span> Human v1.0</p>
                  <p><span className="text-[#39FF14]/70">Architecture:</span> Full-stack (x64)</p>
                  <p><span className="text-[#39FF14]/70">Shell:</span> Terminal UI</p>
                  <p><span className="text-[#39FF14]/70">Uptime:</span> 6+ years</p>
                </div>
              </div>
              <div className="bg-black/30 border-2 border-[#39FF14]/30 rounded-lg p-6 hover:border-[#39FF14]/50 transition-colors">
                <h3 className="text-[#39FF14] font-bold text-lg mb-4 border-b border-[#39FF14]/30 pb-2">Runtime Status</h3>
                <div className="space-y-2 text-[#39FF14]/90">
                  <p><span className="text-[#39FF14]/70">Active Module:</span> Enterprise web apps</p>
                  <p><span className="text-[#39FF14]/70">Focus Mode:</span> <span className="text-[#39FF14]">ENABLED</span></p>
                  <p><span className="text-[#39FF14]/70">Error Rate:</span> <span className="text-[#39FF14]">Negligible</span></p>
                  <p><span className="text-[#39FF14]/70">ASCII Quota:</span> 93%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
        </div>
      </div>
      </>
  );
}
