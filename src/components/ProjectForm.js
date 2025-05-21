// components/ProjectForm.js
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

export default function ProjectForm({ onProjectAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: '',
    featured: false,
    images: [],
    demoUrl: '',
    codeUrl: ''
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const imageUrls = [];

    for (const file of imageFiles) {
      const imgRef = storageRef(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      imageUrls.push(url);
    }

    await addDoc(collection(db, 'projects'), {
      ...form,
      tech: form.tech.split(',').map(t => t.trim()),
      images: imageUrls,
    });

    setForm({ title: '', description: '', tech: '', featured: false, images: [], demoUrl: '', codeUrl: '' });
    setImageFiles([]);
    if (onProjectAdded) onProjectAdded();
  };

  return (
    <form onSubmit={handleAdd} className="bg-black/80 border border-[#39FF14] p-8 rounded-lg shadow-[0_0_20px_#39FF14] font-mono text-[#39FF14] space-y-4 mb-10">
      <h2 className="text-xl font-bold text-[#39FF14]">Add New Project</h2>

      <input
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black border border-[#39FF14] placeholder:text-[#39FF14]/60"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Show on homepage (featured)
      </label>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black border border-[#39FF14] placeholder:text-[#39FF14]/60"
      />

      <input
        name="tech"
        placeholder="Tech (comma-separated)"
        value={form.tech}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black border border-[#39FF14] placeholder:text-[#39FF14]/60"
      />

      <input
        type="file"
        multiple
        onChange={(e) => setImageFiles([...e.target.files])}
        className="w-full text-sm text-[#39FF14] file:bg-[#39FF14] file:text-black file:rounded file:px-3 file:py-1 file:mr-4"
      />

      <input
        name="demoUrl"
        placeholder="Live Demo URL (optional)"
        value={form.demoUrl}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black border border-[#39FF14] placeholder:text-[#39FF14]/60"
      />

      <input
        name="codeUrl"
        placeholder="Source Code URL (e.g. GitHub)"
        value={form.codeUrl}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black border border-[#39FF14] placeholder:text-[#39FF14]/60"
      />

      <button className="bg-[#39FF14] text-black px-4 py-2 rounded hover:bg-green-400 font-bold">
        Add Project
      </button>
    </form>
  );
}
