import { useState, useEffect } from 'react';
import { db } from '../firebase'; // we'll add this shortly
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref as storageRef, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
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
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    tech: '',
    featured: false,
    demoUrl: '',
    codeUrl: '',
    images: []
  });
  const [editImageFiles, setEditImageFiles] = useState([]);

  const projectsRef = collection(db, 'projects');

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(list);
    });
  
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const imageUrls = [];
  
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const storageRef = storageRef(storage, `projects/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }
  
    await addDoc(projectsRef, {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map(t => t.trim()),
      featured: form.featured,
      images: imageUrls,
      demoUrl: form.demoUrl || '',
      codeUrl: form.codeUrl || '',
    });
  
    setForm({ title: '', description: '', tech: '', featured: false });
    setImageFiles([]);
  };

  const handleEditClick = (project) => {
    setEditId(project.id);
    setEditForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      featured: project.featured || false,
      demoUrl: project.demoUrl || '',
      codeUrl: project.codeUrl || '',
      images: project.images || []
    });
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'projects', editId);
    const updates = {
      title: editForm.title,
      description: editForm.description,
      tech: editForm.tech.split(',').map(t => t.trim()),
      featured: editForm.featured,
      demoUrl: editForm.demoUrl,
      codeUrl: editForm.codeUrl
    };
  
    if (editImageFiles.length > 0) {
      const storage = getStorage();
      const newImageUrls = [];

      for (let i = 0; i < editImageFiles.length; i++) {
        const file = editImageFiles[i];
        const imageRef = storageRef(storage, `projects/${Date.now()}_${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        newImageUrls.push(url);
      }

      updates.images = newImageUrls;
    }
  
    await updateDoc(docRef, updates);
  
    setEditId(null);
    setEditImageFiles([]);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Project Form */}
      <form onSubmit={handleAdd} className="bg-gray-800 p-6 rounded shadow mb-10">
        <h2 className="text-xl mb-4 font-semibold">Add New Project</h2>
        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <label className="flex items-center gap-2 text-sm text-gray-300 mb-4">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
          />
          Show on homepage (featured)
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <input
          name="tech"
          placeholder="Tech (comma-separated)"
          value={form.tech}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

          <input
            type="file"
            multiple
            onChange={(e) => setImageFiles([...e.target.files])}
            className="mb-4"
          />

        <input
          name="demoUrl"
          placeholder="Live Demo URL (optional)"
          value={form.demoUrl}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
         />

        <input
          name="codeUrl"
          placeholder="Source Code URL (e.g. GitHub)"
          value={form.codeUrl}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
         />
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
          Add Project
        </button>
      </form>

      {/* Existing Projects */}
      <h2 className="text-xl mb-2 font-semibold">Your Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id} className="bg-gray-900 p-4 mb-4 rounded">
            {editId === p.id ? (
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  name="tech"
                  value={editForm.tech}
                  onChange={handleEditChange}
                  placeholder="Tech (comma-separated)"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <label className="flex items-center gap-2 text-sm text-white">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={editForm.featured}
                    onChange={handleEditChange}
                  />
                  Featured on homepage
                </label>
                <input
                  name="demoUrl"
                  placeholder="Live Demo URL (optional)"
                  value={editForm.demoUrl}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <input
                  name="codeUrl"
                  placeholder="Source Code URL (e.g. GitHub)"
                  value={editForm.codeUrl}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                {editForm.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {editForm.images.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Preview ${i}`}
                        className="rounded w-full object-cover max-h-32"
                      />
                    ))}
                  </div>
                )}

              <label className="block text-sm text-white mb-2">Replace Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setEditImageFiles([...e.target.files])}
                className="mb-4"
              />
              <p className="text-xs text-gray-400 mb-2">Selecting files will replace current images</p>

                <div className="flex gap-3">
                  <button type="submit" className="bg-blue-600 px-4 py-1 rounded text-white">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="text-gray-400 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm">{p.description}</p>
                  <p className="text-sm italic mt-1">{p.tech.join(', ')}</p>
                  {p.featured && (
                    <span className="text-green-400 text-xs mt-1 block">★ Featured</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
