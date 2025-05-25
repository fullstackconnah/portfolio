import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectCard from '../components/ProjectCard';
import AsciiTitle from '../components/AsciiTitle';

const asciiArt = [
'   __  ______  __    ____  ___    ____  _____   __    ____  ______',
'  / / / / __ \\/ /   / __ \\/   |  / __ \\/ ___/  / /   / __ \\/ ____/',
' / / / / /_/ / /   / / / / /| | / / / /\\__ \\  / /   / / / / / __  ',
'/ /_/ / ____/ /___/ /_/ / ___ |/ /_/ /___/ / / /___/ /_/ / /_/ /  ',
'\\____/_/   /_____/\\____/_/  |_/_____//____(_)_____/\\____/\\____/   '
                                                                  
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-black text-[#39FF14] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="mb-10 text-2xl font-bold tracking-wide">
          <AsciiTitle asciiArt={asciiArt}/>
        </div>

        {loading ? (
          <p className="animate-pulse text-[#39FF14]/60">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
