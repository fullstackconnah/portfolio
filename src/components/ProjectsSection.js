function ProjectsSection() {
    return (
      <section id="projects" className="py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-10">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {/* Replace with dynamic project cards later */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">SmartScaff Web App</h3>
            <p className="text-sm mt-2 text-gray-600">Blazor + SQL-based equipment management platform.</p>
          </div>
          {/* More project cards... */}
        </div>
      </section>
    );
  }
  export default ProjectsSection;