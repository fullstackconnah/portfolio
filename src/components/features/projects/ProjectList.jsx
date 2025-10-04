import { useState } from 'react';
import EditableProjectCard from './EditableProjectCard';

export default function ProjectList({ projects = [], onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImageFiles, setEditImageFiles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const handleEditClick = (project) => {
    setEditId(project.id);
    setEditForm({
      title: project.title,
      description: project.description,
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
      featured: project.featured || false,
      demoUrl: project.demoUrl || '',
      codeUrl: project.codeUrl || '',
      images: project.images || []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate(editId, editForm, editImageFiles);
    }
    setEditId(null);
    setEditImageFiles([]);
  };

  return (
    <section className="bg-black/80 border border-[#39FF14] p-8 rounded-lg shadow-[0_0_20px_#39FF14] font-mono text-[#39FF14] space-y-8">
      <h2 className="text-2xl font-bold text-[#39FF14]">Project Management</h2>
      <ul className="space-y-8">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((p) => {
            const isExpanded = expandedId === p.id;
            const descriptionTooLong = (p.description?.length || 0) > 120;

            return (
              <li
                key={p.id}
                className="bg-black border border-[#39FF14] p-6 rounded shadow-[0_0_16px_#39FF14] text-[#39FF14] transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_0_24px_#39FF14]"
              >
                {editId === p.id ? (
                  <EditableProjectCard
                    editForm={editForm}
                    setEditForm={setEditForm}
                    setEditImageFiles={setEditImageFiles}
                    onCancel={() => setEditId(null)}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{p.title}</h3>
                      <p className="text-sm">
                        {descriptionTooLong && !isExpanded
                          ? `${p.description.slice(0, 100)}... `
                          : p.description}
                        {descriptionTooLong && (
                          <button
                            className="text-green-400 underline text-xs ml-1 hover:text-[#39FF14]"
                            onClick={() => setExpandedId(isExpanded ? null : p.id)}
                          >
                            {isExpanded ? 'Show Less' : 'Read More'}
                          </button>
                        )}
                      </p>
                      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#39FF14]/60 scrollbar-track-transparent">
                        <p className="text-xs bg-[#39FF14] text-black px-2 py-1 rounded-full inline-block whitespace-nowrap">
                          {(p.tech || []).join(', ')}
                        </p>
                      </div>
                      {p.featured && (
                        <span className="text-green-400 text-xs block">★ Featured</span>
                      )}
                      <p className="text-xs italic text-[#39FF14]/70">[connah.dev:~]# Project loaded successfully</p>
                    </div>
                    <div className="flex flex-row md:flex-col items-start gap-2 md:ml-4">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                        title="Edit project"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete?.(p.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                        title="Delete project"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <li className="text-[#39FF14]/70 italic">No projects to display.</li>
        )}
      </ul>
    </section>
  );
}
