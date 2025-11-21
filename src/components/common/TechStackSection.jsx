import { useState } from 'react';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import '../../css/techGlitch.css';
import { 
  FaReact, FaAngular, FaHtml5, FaSass, FaJs, FaNode, FaPython, FaPhp, FaDocker, FaGitAlt, FaWordpress, FaDatabase, FaServer, FaCode, FaCloud
} from 'react-icons/fa';
import { 
  SiDotnet, SiTypescript, SiTailwindcss, SiPostgresql, SiFirebase, SiNginx,
  SiPostman, SiSwagger, SiVite, SiJest, SiGithubactions, SiDatadog
} from 'react-icons/si';

export default function TechStackSection() {
  const [glitchingTech, setGlitchingTech] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const techIcons = {
    'React': FaReact,
    'Angular': FaAngular,
    'Blazor': FaCode,
    'TailwindCSS': SiTailwindcss,
    'HTML/CSS': FaHtml5,
    'SASS/SCSS': FaSass,
    'JavaScript': FaJs,
    'TypeScript': SiTypescript,
    'Jest': SiJest,
    '.NET 8/9': SiDotnet,
    '.NET Framework': SiDotnet,
    'Node.js': FaNode,
    'Entity Framework': FaDatabase,
    'ASP.NET Core': SiDotnet,
    'RESTful API': FaServer,
    'PostgreSQL': SiPostgresql,
    'MSSQL': FaDatabase,
    'C#': FaCode,
    'Python': FaPython,
    'PHP': FaPhp,
    'Azure Services': FaCloud,
    'Azure Blob Storage': FaCloud,
    'Firebase': SiFirebase,
    'Firestore': SiFirebase,
    'Azure DevOps': FaCloud,
    'cPanel': FaServer,
    'Git': FaGitAlt,
    'Docker': FaDocker,
    'CI/CD': FaGitAlt,
    'GitHub Actions': SiGithubactions,
    'Azure Pipelines': FaCloud,
    'Swagger': SiSwagger,
    'Postman': SiPostman,
    'Vite': SiVite,
    'VS 2022': FaCode,
    'VS Code': FaCode,
    'Datadog': SiDatadog,
    'Azure Insights': FaCloud,
    'IIS': FaServer,
    'Nginx': SiNginx,
    'WordPress': FaWordpress,
    'WooCommerce': FaWordpress
  };

  const techCategories = [
    {
      name: 'Website Building',
      prefix: '[WEB]',
      techs: ['React', 'Angular', 'Blazor', 'TailwindCSS', 'HTML/CSS', 'SASS/SCSS', 'JavaScript', 'TypeScript', 'Jest']
    },
    {
      name: 'Behind the Scenes',
      prefix: '[SRV]',
      techs: ['.NET 8/9', '.NET Framework', 'Node.js', 'Entity Framework', 'ASP.NET Core', 'RESTful API', 'PostgreSQL', 'MSSQL', 'C#', 'Python', 'PHP']
    },
    {
      name: 'Cloud & Hosting',
      prefix: '[HOST]',
      techs: ['Azure Services', 'Azure Blob Storage', 'Firebase', 'Firestore', 'Azure DevOps', 'cPanel']
    },
    {
      name: 'Automation',
      prefix: '[AUTO]',
      techs: ['Git', 'Docker', 'CI/CD', 'GitHub Actions', 'Azure Pipelines', 'Swagger', 'Postman', 'Vite']
    },
    {
      name: 'Platforms',
      prefix: '[PLAT]',
      techs: ['VS 2022', 'VS Code', 'Datadog', 'Azure Insights', 'IIS', 'Nginx', 'WordPress', 'WooCommerce']
    }
  ];

  const totalTechs = techCategories.reduce((sum, cat) => sum + cat.techs.length, 0);
  const [ref, inView, getDelay] = useStaggerAnimation(totalTechs, { delayIncrement: 30 });

  const handleTechHover = (tech) => {
    setGlitchingTech(tech);
    setTimeout(() => setGlitchingTech(null), 400);
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <section
      ref={ref}
      className={`relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden scroll-fade-in ${inView ? 'in-view' : ''}`}>
      <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
        <span className="text-[#39FF14]/80 text-sm">Tools I Use To Build Your Solutions</span>
        <span className="text-[#39FF14]/60 text-xs">{totalTechs} tools</span>
      </div>

      <div className="absolute inset-0 bg-[#0d0d0d] opacity-50 z-0 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(rgba(57,255,20,0.1) 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }} />

      <div className="relative z-10 p-6">
        <div className="mb-6">
          <p className="text-[#39FF14]/80 text-base mb-2">Professional Tools for Professional Results</p>
          <p className="text-[#39FF14]/60 text-sm">
            I use industry-leading tools to build fast, secure, and reliable solutions for your business
          </p>
        </div>

        { }
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex items-center space-x-4 min-w-max">
            {techCategories.map((category, idx) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex flex-col items-center space-y-2 px-6 py-3 border rounded-lg transition-all duration-300 ${
                  activeCategory === category.name || !activeCategory
                    ? 'border-[#39FF14] bg-[#39FF14]/10 shadow-[0_0_15px_#39FF14]/40'
                    : 'border-[#39FF14]/30 bg-black/50'
                } hover:border-[#39FF14] hover:bg-[#39FF14]/10 cursor-pointer`}
              >
                <span className="text-[#39FF14]/60 text-xs font-mono">{category.prefix}</span>
                <span className="text-[#39FF14] text-sm font-bold whitespace-nowrap">
                  {category.name}
                </span>
                <span className="text-[#39FF14]/60 text-xs">
                  {category.techs.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        { }
        <div className="space-y-6">
          {techCategories
            .filter(cat => !activeCategory || cat.name === activeCategory)
            .map((category, catIdx) => {
              let techIndex = 0;
              return (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-[#39FF14]/60 text-xs font-mono">{category.prefix}</span>
                    <h4 className="text-[#39FF14] text-sm font-bold uppercase">
                      {category.name}
                    </h4>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#39FF14]/40 to-transparent"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech) => {
                      const delay = getDelay(techIndex++);
                      const TechIcon = techIcons[tech];
                      return (
                        <span
                          key={tech}
                          onMouseEnter={() => handleTechHover(tech)}
                          className={`px-3 py-1.5 border border-[#39FF14]/60 rounded bg-black/50 text-[#39FF14]/90 text-xs hover:bg-[#39FF14] hover:text-black transition-all duration-200 shadow-[0_0_5px_#39FF14]/30 hover:shadow-[0_0_15px_#39FF14] hover:scale-105 cursor-default break-words backdrop-blur-sm card-3d-hover stagger-item ${
                            inView ? 'in-view' : ''
                          } ${glitchingTech === tech ? 'animate-tech-glitch' : ''}`}
                          style={{
                            transitionDelay: `${delay}ms`
                          }}
                        >
                          <span className="flex items-center gap-1.5">
                            {TechIcon && <TechIcon className="text-sm flex-shrink-0" />}
                            <span>{tech}</span>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="border-t border-[#39FF14]/20 pt-4 mt-6 flex items-center justify-between text-xs">
          <div className="text-[#39FF14]/60">
            Always staying up-to-date with the latest and best tools
          </div>
          <div className="text-[#39FF14]/60">
            Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </section>
  );
}