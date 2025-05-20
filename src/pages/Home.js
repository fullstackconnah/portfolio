import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, 'projects'));
      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(project => project.featured);
      setProjects(list);
    };
    fetchProjects();
  }, []);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto font-mono text-[#39FF14]">
      
      {/* Hero Terminal Greeting */}
      <HeroSection />

      {/* About Section */}
      <section className="mb-14 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
        <h2 className="text-2xl font-bold mb-3 text-[#39FF14]">About Me</h2>
        <p className="text-[#39FF14]/90 mb-4 leading-relaxed">
          I’m a software developer with experience in .NET, React, WordPress, and full project delivery.
          Whether it’s a Blazor app for scaffold logistics or an NDIS-compliant web platform, I bring ideas to life with clean, maintainable code.
        </p>
        <Link to="/about" className="text-[#39FF14] underline hover:text-green-400 transition">
          Learn more →
        </Link>
      </section>

      {/* Projects Section */}
      <section className="mb-14 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
        <h2 className="text-3xl font-bold text-center text-[#39FF14] mb-10">Featured Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/projects" className="text-[#39FF14] underline hover:text-green-400 transition text-sm font-medium">
            See all projects →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
