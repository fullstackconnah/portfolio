import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects }) {
  return (
    <section className="mb-14 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
      <h2 className="text-3xl font-bold text-center text-[#39FF14] mb-10">Featured Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/projects"
          className="text-[#39FF14] underline hover:text-green-400 transition text-sm font-medium"
        >
          See all projects →
        </Link>
      </div>
    </section>
  );
}
