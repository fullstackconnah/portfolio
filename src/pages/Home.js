import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import TechStackSection from '../components/TechStackSection';
import ServicesSnapshotSection from '../components/ServicesSnapshotSection';
import FinalCTA from '../components/FinalCTA';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

function Home({ onReboot, setIsTearing, setIsShattering }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);
  
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
    <>
      <Helmet>
        <title>Connah Trotman | Software Developer Portfolio</title>
        <meta name="description" content="Welcome to Connah.dev – a terminal-themed portfolio built by Connah Trotman, full-stack software developer with expertise in .NET, Angular, React, and cloud platforms. Explore immersive UIs, clean code, and real-world projects." />
      </Helmet>
      <div className="px-6 py-10 max-w-5xl mx-auto font-mono text-[#39FF14]">
        <HeroSection onReboot={onReboot} setIsTearing={ setIsTearing } setIsShattering={ setIsShattering }/>
        <AboutSection />
        <ServicesSnapshotSection />
        <TechStackSection />
        <ProjectsSection projects={projects} />
        <FinalCTA />
      </div>
    </>
  );
}

export default Home;
