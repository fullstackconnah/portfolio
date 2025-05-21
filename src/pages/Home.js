import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import TerminalNavigator from '../components/TerminalNavigator';

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
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <TerminalNavigator />
    </div>
  );
}

export default Home;
