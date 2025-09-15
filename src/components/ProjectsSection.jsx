import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects }) {
  return (
    <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
      <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
        <span className="text-[#39FF14]/80 text-sm">projects.db</span>
        <span className="text-[#39FF14]/60 text-xs">featured: {projects.length}</span>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-6">
          <span className="text-[#39FF14] mr-2">$</span>
          <span className="text-[#39FF14]/80">SELECT * FROM projects WHERE featured = true;</span>
        </div>

        <div className="mb-6">
          <p className="text-[#39FF14]/60 text-sm">
            <span className="text-[#39FF14]/80">{projects.length} rows returned</span> • Displaying featured portfolio items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#39FF14]/60 text-sm animate-pulse">
              Loading projects...
            </div>
            <div className="mt-2">
              <span className="inline-block w-1 h-4 bg-[#39FF14] animate-pulse"></span>
            </div>
          </div>
        )}

        <div className="border-t border-[#39FF14]/20 pt-4 flex items-center justify-between">
          <div className="text-[#39FF14]/60 text-xs">
            Query executed in 0.{Math.floor(Math.random() * 99) + 1}ms
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 bg-transparent border border-[#39FF14]/60 px-4 py-2 rounded text-[#39FF14]/80 text-sm font-mono transition-all duration-300 hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10 hover:scale-105"
          >
            <span>→</span>
            <span>View All Records</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
