import { Link } from 'react-router-dom';

function ProjectCard({ title, description, tech, link }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-semibold">Tech:</span> {tech.join(', ')}
        </p>
      </div>
      <Link
        to={link}
        className="text-blue-600 hover:text-blue-800 font-medium mt-auto"
      >
        View Project →
      </Link>
    </div>
  );
}

export default ProjectCard;
