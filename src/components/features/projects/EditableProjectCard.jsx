export default function EditableProjectCard({ editForm, setEditForm, setEditImageFiles, onCancel, onSubmit }) {

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageDelete = (index) => {
    const updatedImages = editForm.images.filter((_, i) => i !== index);
    setEditForm({ ...editForm, images: updatedImages });
  };

  return (
    <form onSubmit={onSubmit} className="bg-black border border-[#39FF14] p-6 rounded shadow-[0_0_8px_#39FF14] space-y-3">
      <input
        name="title"
        value={editForm.title}
        onChange={handleEditChange}
        className="bg-black text-[#39FF14] border border-[#39FF14] placeholder-[#39FF14]/50 text-sm p-2 rounded w-full"
      />

      <textarea
        name="description"
        value={editForm.description}
        onChange={handleEditChange}
        className="bg-black text-[#39FF14] border border-[#39FF14] placeholder-[#39FF14]/50 text-sm p-2 rounded w-full"
      />

      <input
        name="tech"
        value={editForm.tech}
        onChange={handleEditChange}
        placeholder="Tech (comma-separated)"
        className="bg-black text-[#39FF14] border border-[#39FF14] placeholder-[#39FF14]/50 text-sm p-2 rounded w-full"
      />

      <label className="text-[#39FF14] text-xs font-mono mb-1 block">
        <input
          type="checkbox"
          name="featured"
          checked={editForm.featured}
          onChange={handleEditChange}
          className="accent-[#39FF14] mr-2"
        />
        Featured on homepage
      </label>

      <input
        name="demoUrl"
        placeholder="Live Demo URL (optional)"
        value={editForm.demoUrl}
        onChange={handleEditChange}
        className="bg-black text-[#39FF14] border border-[#39FF14] placeholder-[#39FF14]/50 text-sm p-2 rounded w-full"
      />

      <input
        name="codeUrl"
        placeholder="Source Code URL (e.g. GitHub)"
        value={editForm.codeUrl}
        onChange={handleEditChange}
        className="bg-black text-[#39FF14] border border-[#39FF14] placeholder-[#39FF14]/50 text-sm p-2 rounded w-full"
      />

      {editForm.images?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-2">
          {editForm.images.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Preview ${i}`}
                className="rounded w-full object-cover max-h-32 border border-[#39FF14]"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(i)}
                className="absolute top-1 right-1 bg-black text-[#39FF14] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 border border-[#39FF14] hover:bg-[#39FF14] hover:text-black transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="text-[#39FF14] text-xs font-mono mb-1 block">Replace or Add Images</label>
      <input
        type="file"
        multiple
        onChange={(e) => setEditImageFiles([...e.target.files])}
        className="mb-4 text-sm text-[#39FF14] file:bg-[#39FF14] file:text-black file:rounded file:px-3 file:py-1 file:mr-4"
      />

      <div className="flex gap-3">
        <button type="submit" className="bg-[#39FF14] text-black font-bold px-4 py-1 rounded hover:bg-green-400 transition">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[#39FF14] underline hover:text-green-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
