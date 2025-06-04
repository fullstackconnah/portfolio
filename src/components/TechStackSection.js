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

  const renderStack = (stack) =>
    Object.entries(stack).map(([category, techs], index, arr) => (
      <div key={category}>
        <div className="flex items-center space-x-2 uppercase text-sm text-green-400 mb-2 tracking-wider pl-4 relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#39FF14]">&gt;</span>
          <span className="pl-4">{category}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 border border-[#39FF14] rounded bg-black text-[#39FF14] text-xs hover:bg-[#39FF14] hover:text-black transition duration-150 shadow-[0_0_5px_#39FF14] hover:shadow-[0_0_10px_#39FF14] hover:animate-pulse break-words max-w-[200px]"
            >
              {tech}
            </span>
          ))}
        </div>
        {index !== arr.length - 1 && (
          <div className="w-full h-[1px] bg-[#39FF14]/10 mt-6 blur-sm" />
        )}
      </div>
    ));

  return (
    <section className="relative z-10 border border-[#39FF14] rounded-lg shadow-[0_0_10px_#39FF14] text-[#39FF14] font-mono mt-12 mb-12 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d0d] matrix-bg animate-matrix z-0 pointer-events-none" />
      <div className="relative z-10 p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold mb-6 tracking-wide border-b border-[#39FF14]/40 pb-2 glitch">
          &gt; Installed Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-6">{renderStack(leftStack)}</div>
          <div className="space-y-6">{renderStack(rightStack)}</div>
        </div>
      </div>
    </section>
  );
}