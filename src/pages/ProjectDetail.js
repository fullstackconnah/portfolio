import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'projects', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setProject({ id: snapshot.id, ...snapshot.data() });
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <p className="text-center py-10 text-gray-500">Loading project...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-800 dark:text-gray-200"
          >
            {t}
          </span>
        ))}
      </div>

      {project.images?.length > 0 && (
        <Swiper spaceBetween={20} slidesPerView={1} className="mb-6">
            {project.images.map((url, i) => (
            <SwiperSlide key={i}>
                <img src={url} alt={`Slide ${i}`} className="rounded-lg w-full object-cover max-h-[400px]" />
            </SwiperSlide>
            ))}
        </Swiper>
        )}

      <div className="flex gap-6">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Live Demo
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Source Code
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;