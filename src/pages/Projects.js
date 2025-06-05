import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import AsciiTitle from '../components/AsciiTitle';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

const asciiArt = [
  '   __  ______  __    ____  ___    ____  _____   __    ____  ______',
  '  / / / / __ \\/ /   / __ \\/   |  / __ \\/ ___/  / /   / __ \\/ ____/',
  ' / / / / /_/ / /   / / / / /| | / / / /\\__ \\  / /   / / / / / __  ',
  '/ /_/ / ____/ /___/ /_/ / ___ |/ /_/ /___/ / / /___/ /_/ / /_/ /  ',
  '\\____/_/   /_____/\\____/_/  |_/_____//____(_)_____/\\____/\\____/   '
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Projects | Connah.dev';
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const fetched = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(fetched);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects | Connah.dev</title>
        <meta name="description" content="Explore software projects built by Connah Trotman, including enterprise apps, web platforms, and creative interfaces using .NET, React, Blazor, Firebase, SQL, and more." />
      </Helmet>
    
    <div className="min-h-screen text-[#39FF14] font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

        <div className="mb-10 text-2xl font-bold tracking-wide">
          <AsciiTitle asciiArt={asciiArt} />
        </div>

        <p
          onClick={() => navigate(-1)}
          className="text-green-400 font-mono text-sm underline cursor-pointer hover:text-[#39FF14] transition mb-6"
        >
          &gt; return
        </p>

        <div className="rounded-lg border border-[#39FF14] p-6 md:p-6 shadow-[0_0_25px_#39FF14] bg-[#0f0f0f]/80 backdrop-blur-sm">
        <p className="text-[#39FF14] font-mono text-sm mb-4 select-none">
          guest@connah.dev:~$ <span className="text-[#39FF14]/60">tail -f uploads.log</span>
        </p>
        <div className='p-6 md:p-3'>
          {loading ? (
              <p className="animate-pulse text-[#39FF14]/60">Loading projects...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {projects.map((project, i) => (
                  <div
                    key={project.id}
                    className="pb-10 opacity-0 animate-projectsFadeIn"
                    style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
                  >
                    <p className="text-xs text-[#39FF14]/50 font-mono mb-2">
                    &gt; [INFO] Upload accepted [{new Date().toISOString().slice(0, 10)}]
                    </p>
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      tech={project.tech}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}