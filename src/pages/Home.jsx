import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import HeroSection from '../components/HeroSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProjectsSection from '../components/ProjectsSection.jsx';
import TechStackSection from '../components/TechStackSection.jsx';
import ServicesSnapshotSection from '../components/ServicesSnapshotSection.jsx';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';

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
      <div className="font-mono text-[#39FF14]">
        {/* Full Screen Hero Section */}
        <HeroSection onReboot={onReboot} setIsTearing={setIsTearing} setIsShattering={setIsShattering} />

        {/* Main Content Sections */}
        <div id="main-content" className="px-6 pt-4 pb-16 max-w-6xl mx-auto space-y-24">
          {/* Interactive Terminal - Right after hero as originally positioned */}
          <AboutSection onReboot={onReboot} setIsTearing={setIsTearing} setIsShattering={setIsShattering} />

          {/* Lead with Services - Most Important for Business */}
          <ServicesSnapshotSection />

          {/* Featured Projects - Show Your Work */}
          <ProjectsSection projects={projects} />

          {/* Tech Stack - For Technical Credibility */}
          <TechStackSection />
        </div>
      </div>
    </>
  );
}

export default Home;
