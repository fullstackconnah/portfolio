import AsciiTitle from '../components/AsciiTitle';
import { useNavigate } from 'react-router-dom';
import '../css/TerminalCard.css';
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
const asciiArt = [
  '    ____  ____  ____  ____________    ______  _______  __ ______',
  '   / __ \\/ __ \\/ __ \\/ ____/  _/ /   / ____/ / ____/ |/ // ____/',
  '  / /_/ / /_/ / / / / /_   / // /   / __/   / __/  |   // __/   ',
  ' / ____/ _, _/ /_/ / __/ _/ // /___/ /____ / /___ /   |/ /___   ',
  '/_/   /_/ |_|\\____/_/   /___/_____/_____(_)_____//_/|_/_____/   '
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-[#39FF14] font-mono">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

      <div className="mb-10">
        <AsciiTitle asciiArt={asciiArt} />
      </div>

      <p
        onClick={() => navigate(-1)}
        className="text-green-400 font-mono text-sm underline cursor-pointer hover:text-[#39FF14] transition mb-6"
      >
        &gt; return
      </p>

      <div className="rounded-lg border border-[#39FF14] shadow-[0_0_25px_#39FF14] bg-black/40 backdrop-blur-sm p-6 md:p-10">
            <div className="p-6 sm:p-2 space-y-10">
            {[
              {
                label: 'whoami',
                content: `Full-stack software developer with a strong foundation in frontend and backend technologies, hands-on leadership experience in robotics, and a passion for crafting polished, immersive user interfaces.`,
              },
              {
                label: 'cat bio.txt',
                content: (
                  <p className="text-sm leading-relaxed whitespace-pre-line text-[#39FF14]">
                    I’m a software developer with over 3 years of experience building scalable, secure applications in <span className="text-green-300 font-medium">.NET</span> environments. My expertise includes <span className="text-green-300 font-medium">Angular</span>, <span className="text-green-300 font-medium">Blazor</span>, and <span className="text-green-300 font-medium">SQL</span>, with strong exposure to cloud platforms like <span className="text-green-300 font-medium">Azure</span> and <span className="text-green-300 font-medium">Firebase</span>.

                    {'\n\n'}I’ve contributed to enterprise systems at Netwealth Investments, led end-to-end delivery of media-heavy web applications at SmartScaff, and built NDIS-compliant solutions for the disability care sector. My background in robotics and game dev has shaped a mindset that’s both analytical and creative.

                    {'\n\n'}From multi-tier architecture and microservices to UI polish and terminal interfaces — I bring ideas to life with clean code and purposeful design.
                  </p>
                )
              },
              {
                label: 'history --log',
                content: (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>[2017–2018] Led national-level robotics team; developed control firmware and autonomous routines</li>
                    <li>[2021] Built scaffold logistics platform (Blazor + .NET + SQL) for SmartScaff’s internal operations</li>
                    <li>[2022–2025] Developed and maintained enterprise investment systems at Netwealth using .NET Core, T-SQL, Angular, and Azure DevOps</li>
                    <li>[2025] Delivered advanced holiday filtering and content platform for NDIS services (WordPress + Pods)</li>
                    <li>[2025] Created this retro-terminal portfolio using React, Firebase, and TailwindCSS with real-time admin editing</li>
                  </ul>
                )
              },
              {
                label: 'uptime',
                content: (
                  <ul className="space-y-1 text-sm">
                    <li>Years of coding: 8+</li>
                    <li>Enterprise projects shipped: 12+</li>
                    <li>Frameworks deployed: Angular, Blazor, .NET, React</li>
                    <li>Systems debugged: many — including one robot fire 🔥</li>
                  </ul>
                )
              },
              {
                label: 'skills --soft',
                content: (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Collaborative and clear communicator</li>
                    <li>Agile & hybrid delivery experience</li>
                    <li>Problem-solving under tight deadlines</li>
                    <li>Test-driven development & clean code mindset</li>
                    <li>Client engagement and stakeholder feedback integration</li>
                  </ul>
                )
              },
              {
                label: 'sysinfo --metrics',
                content: (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-black/60 p-3 rounded border border-[#39FF14]/40 shadow-sm transition-all hover:border-[#39FF14] hover:shadow-[0_0_8px_#39FF14] hover:animate-flicker">
                      <p>OS: Human v1.0</p>
                      <p>Architecture: Full-stack (x64)</p>
                      <p>Shell: Terminal UI</p>
                      <p>Uptime: 6+ years</p>
                    </div>
                    <div className="bg-black/60 p-3 rounded border border-[#39FF14]/40 shadow-sm transition-all hover:border-[#39FF14] hover:shadow-[0_0_8px_#39FF14] hover:animate-flicker">
                      <p>Active Module: Enterprise web apps</p>
                      <p>Focus Mode: ENABLED</p>
                      <p>Error Rate: Negligible</p>
                      <p>ASCII Quota: 93%</p>
                    </div>
                  </div>
                )
              },
              {
                label: 'run resume.pdf',
                content: (
                  <a
                    href="/ConnahTrotman_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mt-2 border border-[#39FF14] rounded bg-black text-[#39FF14] text-sm hover:bg-[#39FF14] hover:text-black transition-all shadow-[0_0_5px_#39FF14] hover:shadow-[0_0_10px_#39FF14]"
                  >
                    Open Résumé →
                  </a>
                )
              }
            ].map(({ label, content }, i) => (
              <div key={label} className="space-y-4 mb-12 bg-[#0c0c0c]/90 p-5 rounded-md border border-[#39FF14]/10 shadow-inner group transition-all">
                
                <div className="flex items-center text-sm text-green-400 tracking-wider uppercase">
                  <span className="mr-2 text-[#39FF14]">&gt;</span>
                  <span className={`pl-1 font-semibold text-[#39FF14] ${label === 'run resume.pdf' ? 'hover-flicker' : ''}`}>{label}</span>
                  <div className="flex-grow h-px bg-[#39FF14]/10 ml-3 blur-sm" />
                </div>

                <div className="whitespace-pre-line text-[#39FF14] text-sm leading-relaxed">
                  {content}
                </div>
              </div>
            ))}

            </div>
          </div>
        </div>
      </div>
  );
}
