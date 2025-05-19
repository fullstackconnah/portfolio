import { Link } from 'react-router-dom';

function ProjectCard({ title, description, tech = [], id }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] p-6 flex flex-col justify-between transition-colors duration-300">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <Link
        to={`/projects/${id}`}
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-auto"
      >
        View Project →
      </Link>

    </div>
  );
}


export default ProjectCard;