import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import TechStackSection from '../components/TechStackSection';

function Home({ onReboot, setIsTearing, setIsShattering }) {
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
      <HeroSection onReboot={onReboot} setIsTearing={ setIsTearing } setIsShattering={ setIsShattering }/>
      <AboutSection />
      <TechStackSection />
      <ProjectsSection projects={projects} />
    </div>
  );
}

export default Home;
