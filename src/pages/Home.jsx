import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import HeroSection from '../components/common/HeroSection.jsx';
import AboutSection from '../components/common/AboutSection.jsx';
import ProjectsSection from '../components/features/projects/ProjectsSection.jsx';
import TechStackSection from '../components/common/TechStackSection.jsx';
import ServicesSnapshotSection from '../components/common/ServicesSnapshotSection.jsx';
import QuickStatsTerminal from '../components/common/QuickStatsTerminal.jsx';
import SocialLinksHub from '../components/common/SocialLinksHub.jsx';

import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';
import '../css/scrollAnimations.css';

function Home({ onReboot, setIsTearing, setIsShattering }) {
  const [projects, setProjects] = useState([]);
  const [bentoInView, setBentoInView] = useState(false);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBentoInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const bentoGrid = document.getElementById('bento-grid');
    if (bentoGrid) {
      observer.observe(bentoGrid);
    }

    return () => {
      if (bentoGrid) {
        observer.unobserve(bentoGrid);
      }
    };
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

  // ASYMMETRIC CASCADE LAYOUT - permanent default
  const bentoGrid = (
    <div id="bento-grid" className="flex flex-col gap-6">
      {/* Top row: About + Stats/Social */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6">
        <div className={`md:col-span-4 lg:col-span-5 bento-box ${bentoInView ? 'in-view' : ''}`} style={{ height: '506px' }}>
          <AboutSection onReboot={onReboot} setIsTearing={setIsTearing} setIsShattering={setIsShattering} />
        </div>
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
          <div className={`bento-box ${bentoInView ? 'in-view' : ''}`} style={{ height: '200px' }}>
            <QuickStatsTerminal />
          </div>
          <div className={`bento-box ${bentoInView ? 'in-view' : ''}`} style={{ height: '280px' }}>
            <SocialLinksHub />
          </div>
        </div>
      </div>
      
      {/* Services - full width */}
      <div className="grid grid-cols-1 gap-6">
        <div className={`bento-box ${bentoInView ? 'in-view' : ''}`} style={{ minHeight: '400px' }}>
          <ServicesSnapshotSection />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Connah Trotman | Technology That Works For Your Business</title>
        <meta name="description" content="Friendly web development and IT support for small businesses. I help you grow online with custom websites, reliable hosting, and tech support you can understand. Based in Australia." />
      </Helmet>
      <div className="font-mono text-[#39FF14]">
        <HeroSection onReboot={onReboot} setIsTearing={setIsTearing} setIsShattering={setIsShattering} />

        <div id="main-content" className="px-6 pt-4 pb-16 max-w-7xl mx-auto space-y-24">
          {bentoGrid}
          <ProjectsSection projects={projects} />
          <TechStackSection />
        </div>
      </div>
    </>
  );
}

export default Home;
