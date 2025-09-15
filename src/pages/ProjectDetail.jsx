import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import 'swiper/css';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';


function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

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
    <>
      <Helmet>
        <title>{project.title} | Connah.dev</title>
        <meta name="description" content={`View details about "${project.title}" – a software project built using ${project.tech.join(', ')}.`} />
      </Helmet>

    <div className="max-w-4xl mx-auto py-10 px-4 font-mono text-[#39FF14]">
        <span className="text-xs block mb-2 text-[#39FF14]"> opening project/{project.title}...</span>
      <h1 className="text-3xl font-bold mb-4 border-b border-[#39FF14] pb-2">
        {project.title}
      </h1>
  
      <p className="mb-6 whitespace-pre-line">
        {project.description}
      </p>
  
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="bg-black border border-[#39FF14] px-3 py-1 rounded-full text-xs tracking-wide"
          >
            &gt; {t}
          </span>
        ))}
      </div>
  
      {project.images?.length > 0 && (
        <Swiper spaceBetween={20} slidesPerView={1} className="mb-10">
          {project.images.map((url, i) => (
            <SwiperSlide key={i}>
              <img
                src={url}
                alt={`Slide ${i}`}
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
                className="cursor-zoom-in rounded-lg w-full object-cover max-h-[400px] border border-[#39FF14] shadow-[0_0_10px_#39FF14]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    {lightboxOpen && (
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={project.images.map((url) => ({ src: url }))}
      />
    )}

      <div className="flex gap-6 mt-6">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-[#39FF14] text-[#39FF14] px-4 py-2 rounded hover:bg-[#39FF14] hover:text-black transition font-mono"
            >
            View Demo
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-[#39FF14] text-[#39FF14] px-4 py-2 rounded hover:bg-[#39FF14] hover:text-black transition font-mono"
            >
            View Code
          </a>
        )}
      </div>
      <div className="mt-8 text-xs text-[#39FF14]">
            <p>&gt; cat README.md</p>
            <p>Project by Connah — built with React and Firebase</p>
            <p>&gt; run deploy.sh — Success ✅</p>
        </div>
    </div>
    </>
  );
}

export default ProjectDetail;