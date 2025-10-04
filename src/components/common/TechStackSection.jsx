export default function TechStackSection() {
  const leftStack = {
    'Programming Languages': ['C#', 'JavaScript', 'TypeScript', 'SQL', 'YAML', 'Bash / PowerShell', 'Python', 'PHP'],
    'Frontend Development': ['React', 'Angular', 'Blazor', 'TailwindCSS', 'HTML/CSS', 'SASS/SCSS', 'Jest'],
    'Backend Development': ['.NET 8 / .NET 9', '.NET Framework 4.8', 'Node.js', 'Entity Framework', 'ASP.NET Core Web API', 'ASP.NET MVC', 'LINQ', 'RESTful API Design', 'PostgreSQL', 'MSSQL Server 2019'],
    'Monitoring & Operations': ['Datadog', 'Azure App Insights', 'IIS', 'Nginx'],
    'CMS & Web Platforms': ['WordPress', 'Elementor', 'Pods', 'WooCommerce']
  };

  const rightStack = {
    'DevOps & CI/CD': ['Git', 'Docker', 'Docker Containerisation', 'CI/CD', 'Github Actions', 'Azure Devops Pipelines', 'Swagger / OpenAPI', 'Postman', 'Vite'],
    'Cloud & Infrastructure': ['Azure App Services', 'Azure Blob Storage', 'Azure DevOps Boards', 'Firebase', 'Firebase Authentication', 'Firestore', 'cPanel Servers', 'Atlassian Suite'],
    'Tooling & IDEs': ['VS 2022', 'Visual Studio Code'],
    'Soft Skills & Practices': [
      'Test-Driven Development',
      'Leadership',
      'Communication',
      'Problem Solving',
      'Collaboration',
      'Initiative',
      'Stakeholder Engagement',
    'Agile/Hybrid Methodologies']
  };

  const totalTechs = Object.values(leftStack).flat().length + Object.values(rightStack).flat().length;

  const renderStack = (stack) =>
    Object.entries(stack).map(([category, techs], index, arr) => (
      <div key={category} className="group">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-[#39FF14]/60 text-xs font-mono">
            [{(category.match(/\b\w/g) || []).join('').toUpperCase()}]
          </span>
          <div className="flex-1 flex items-center">
            <span className="text-[#39FF14] text-sm font-bold uppercase tracking-wider">
              {category}
            </span>
            <div className="flex-1 ml-3 h-px bg-gradient-to-r from-[#39FF14]/40 to-transparent"></div>
          </div>
          <span className="text-[#39FF14]/60 text-xs">
            {techs.length} items
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {techs.map((tech, techIndex) => (
            <span
              key={tech}
              className="px-3 py-1.5 border border-[#39FF14]/60 rounded bg-black/50 text-[#39FF14]/90 text-xs hover:bg-[#39FF14] hover:text-black transition-all duration-200 shadow-[0_0_5px_#39FF14]/30 hover:shadow-[0_0_15px_#39FF14] hover:scale-105 cursor-default break-words backdrop-blur-sm"
              style={{
                animationDelay: `${techIndex * 0.05}s`
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        {index !== arr.length - 1 && (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent mb-6"></div>
        )}
      </div>
    ));

  return (
    <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
      <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
        <span className="text-[#39FF14]/80 text-sm">package-manager.sys</span>
        <span className="text-[#39FF14]/60 text-xs">modules: {totalTechs}</span>
      </div>

      <div className="absolute inset-0 bg-[#0d0d0d] opacity-50 z-0 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(rgba(57,255,20,0.1) 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }} />

      <div className="relative z-10 p-6">
        <div className="flex items-center mb-4">
          <span className="text-[#39FF14] mr-2">$</span>
          <span className="text-[#39FF14]/80">npm list --depth=0 --global</span>
        </div>

        <div className="mb-6">
          <p className="text-[#39FF14]/60 text-sm">
            <span className="text-[#39FF14]/80">System scan complete</span> • {totalTechs} packages indexed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-6">{renderStack(leftStack)}</div>
          <div className="space-y-6">{renderStack(rightStack)}</div>
        </div>

        <div className="border-t border-[#39FF14]/20 pt-4 mt-6 flex items-center justify-between text-xs">
          <div className="text-[#39FF14]/60">
            Package audit: 0 vulnerabilities found
          </div>
          <div className="text-[#39FF14]/60">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </section>
  );
}