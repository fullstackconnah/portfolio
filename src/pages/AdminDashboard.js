import { useState, useEffect } from 'react';
import { db } from '../firebase'; // we'll add this shortly
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', tech: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    tech: '',
    featured: false
  });

  const projectsRef = collection(db, 'projects');

  // Fetch projects on load
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
    if (!form.title || !form.description) return;

    await addDoc(projectsRef, {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map(t => t.trim()),
      featured: form.featured
    });

    setForm({ title: '', description: '', tech: '' });
  };

  const handleEditClick = (project) => {
    setEditId(project.id);
    setEditForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      featured: project.featured || false
    });
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const ref = doc(db, 'projects', editId);
    await updateDoc(ref, {
      title: editForm.title,
      description: editForm.description,
      tech: editForm.tech.split(',').map(t => t.trim()),
      featured: editForm.featured
    });
  
    setEditId(null);
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
