import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="mb-14 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
      <h2 className="text-2xl font-bold mb-3 text-[#39FF14]">About Me</h2>
      <p className="text-[#39FF14]/90 mb-4 leading-relaxed">
        I’m a software developer with experience in .NET, React, WordPress, and full project delivery.
        Whether it’s a Blazor app for scaffold logistics or an NDIS-compliant web platform,
        I bring ideas to life with clean, maintainable code.
      </p>
      <Link to="/about" className="text-[#39FF14] underline hover:text-green-400 transition">
        Learn more →
      </Link>
    </section>
  );
}