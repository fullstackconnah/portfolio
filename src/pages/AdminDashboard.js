import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const projectsRef = collection(db, 'projects');

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(list);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  const handleUpdate = async (id, form, imageFiles) => {
    const updates = {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map(t => t.trim()),
      featured: form.featured,
      demoUrl: form.demoUrl,
      codeUrl: form.codeUrl,
      images: form.images || [] 
    };
  
    if (imageFiles && imageFiles.length > 0) {
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storage = getStorage();
      const newImageUrls = [];
  
      for (const file of imageFiles) {
        if (!(file instanceof File)) continue;
  
        const imgRef = ref(storage, `projects/${Date.now()}_${file.name}`);
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);
        newImageUrls.push(url);
      }
  
      updates.images = [...updates.images, ...newImageUrls];
    }
  
    await updateDoc(doc(db, 'projects', id), updates);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-[#39FF14] font-mono">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ProjectForm onProjectAdded={() => console.log('Project added!')} />
      <ProjectList
        projects={projects}
        setProjects={setProjects}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default AdminDashboard;