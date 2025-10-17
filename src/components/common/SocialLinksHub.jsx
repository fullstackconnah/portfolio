import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { use3DTilt } from '../../hooks/use3DTilt';
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope } from 'react-icons/fa';

export default function SocialLinksHub() {
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.3 });
  const [tiltRef, tiltStyle, glareStyle] = use3DTilt({ maxTilt: 5, scale: 1.01 });
  const [githubProjects, setGithubProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        const projects = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(project => project.featured && project.codeUrl)
          .slice(0, 3);

        setGithubProjects(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/connah-trotman',
      color: 'hover:text-blue-400',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/fullstackconnah',
      color: 'hover:text-gray-300',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:info@connah.com.au',
      color: 'hover:text-green-400',
    }
  ];

  return (
    <div
      ref={scrollRef}
      className={`scroll-fade-in ${inView ? 'in-view' : ''} h-full`}
    >
      <div
        ref={tiltRef}
        className="h-full"
        style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
      >
        <section
          className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden h-full flex flex-col"
        >
          {/* Glare effect */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              ...glareStyle,
              mixBlendMode: 'overlay',
              zIndex: 100
            }}
          />

          {/* Header */}
          <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-3 py-1.5 flex items-center justify-between relative z-10 pointer-events-none">
            <span className="text-[#39FF14]/80 text-xs">social.links</span>
            <div className="flex items-center space-x-2">
              <span className="text-[#39FF14]/60 text-xs">[{socialLinks.length}]</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col relative z-10">
            <div className="flex items-center mb-2 pointer-events-none">
              <span className="text-[#39FF14] mr-2 text-xs">$</span>
              <span className="text-[#39FF14]/80 text-xs">./connect --social</span>
            </div>

            {/* Redesigned layout - Featured Repos as main focus */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Top row: Social links - made more compact */}
              <div className="grid grid-cols-3 gap-1.5 pointer-events-auto">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative bg-[#0f0f0f] border border-[#39FF14]/40 rounded-lg p-1.5 flex flex-col items-center justify-center hover:border-[#39FF14] hover:bg-[#39FF14]/10 hover:shadow-[0_0_15px_#39FF14]/40 transition-all duration-300 ${link.color}`}
                    >
                      <Icon className="text-[#39FF14] text-sm group-hover:scale-110 transition-transform mb-0.5" />
                      <span className="text-[#39FF14]/80 text-[9px] group-hover:text-[#39FF14] transition-colors leading-tight">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Featured Repos - maximum prominence, full available space */}
              {githubProjects.length > 0 && (
                <>
                  <div className="w-full h-px bg-[#39FF14]/20"></div>
                  <div className="flex-1 min-h-0">
                    <div className="text-[#39FF14] text-xs mb-2.5 pointer-events-none font-bold">Featured Repositories</div>
                    <div className="space-y-2 pointer-events-auto">
                      {githubProjects.map((project, index) => (
                        <a
                          key={project.id}
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                          title={project.title}
                        >
                          <div className="flex items-center gap-2.5 px-3 py-2 bg-[#0f0f0f] border border-[#39FF14]/40 rounded-lg hover:border-[#39FF14] hover:bg-[#39FF14]/10 hover:shadow-[0_0_15px_#39FF14]/40 transition-all duration-300"
                          >
                            <div className="flex items-center justify-center w-7 h-7 bg-[#39FF14]/10 rounded-full">
                              <FaGithub className="text-[#39FF14] text-sm flex-shrink-0 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-[#39FF14]/90 text-xs truncate flex-1 font-medium">
                              {project.title}
                            </span>
                            <span className="text-[#39FF14] group-hover:text-[#39FF14]/80 text-xs bg-[#39FF14]/20 px-2 py-0.5 rounded-full font-bold">
                              #{index + 1}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
