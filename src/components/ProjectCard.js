import { Link } from 'react-router-dom';
import '../css/TerminalCard.css'; // Make sure this includes flicker or scanlines if needed

function ProjectCard({ title, description, tech = [], id }) {
  return (
    <div className="relative group bg-black border border-[#39FF14] text-[#39FF14] font-mono rounded-lg p-5 shadow-[0_0_10px_#39FF14] transition duration-300 hover:shadow-[0_0_20px_#39FF14] hover:scale-[1.015] hover:animate-terminalFlicker overflow-hidden">

      {/* ASCII Terminal-style Header */}
      <div className="flex items-center text-xs text-[#39FF14]/80 mb-3 select-none font-mono">
      <span className="mr-2">┌─[</span>
        <span className="font-bold text-[#39FF14]">PROJECT</span>
        <span className="flex-1 border-1 border-t border-[#39FF14]/40 ml-2" />
      </div>

      {/* Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-5 z-0 bg-[linear-gradient(rgba(57,255,20,0.1)_50%,transparent_50%)] bg-[length:100%_2px]" />

      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-[#39FF14]/80 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, i) => (
            <span
              key={i}
              className="bg-[#0f0f0f] border border-[#39FF14] text-xs px-2 py-1 rounded shadow-[0_0_4px_#39FF14] whitespace-nowrap hover:bg-[#39FF14] hover:text-black transition"
            >
              {item}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${id}`}
          className="text-sm underline hover:text-green-300 transition inline-block"
        >
          &gt; View Project
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;