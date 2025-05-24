import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="mb-14 mt-8 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
      <h2 className="text-2xl font-bold mb-3 text-[#39FF14]">About Me</h2>
      <p className="text-[#39FF14]/90 mb-4 leading-relaxed">
      I’m a full-stack developer with 3+ years of Angular and .NET experience, a background in robotics team leadership, and a passion for building immersive tech. Whether it’s a Blazor logistics app or a terminal-themed portfolio, I bring clean architecture and creative execution to every project.      </p>
      <p className="text-[#39FF14]/90 mb-4 leading-relaxed">
      I specialize in .NET, Angular, React, Firebase, and Azure — but I’ve also led teams, launched products, and debugged robots at midnight.      </p>
      <Link to="/about" className="text-[#39FF14] underline hover:text-green-400 transition">
        Learn more →
      </Link>
    </section>
  );
}
