import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function Home() {
  const featuredProjects = [
    {
      title: 'SmartScaff App',
      description: 'A full-stack Blazor app for managing scaffold inventory, images, and documents.',
      tech: ['Blazor', '.NET', 'SQL'],
      link: '/projects#smartscaff',
    },
    {
      title: 'Oassist Website',
      description: 'A responsive WordPress site with custom holiday filtering and Elementor design.',
      tech: ['WordPress', 'Pods', 'Search & Filter Pro'],
      link: '/projects#oassist',
    },
    {
      title: 'Portfolio Site',
      description: 'This site — built with React and React Router to showcase my work.',
      tech: ['React', 'JSX', 'GitHub Pages'],
      link: '/projects#portfolio',
    },
  ];

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto transition-colors duration-300">
      {/* Hero Section */}
      <section className="mb-16 text-center bg-white dark:bg-[#121212] rounded-lg py-10 px-6 shadow-sm transition-colors duration-300">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">Hi, I'm Connah 👋</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          I build scalable full-stack apps, custom WordPress sites, and solve real-world problems with code.
        </p>
        <Link
          to="/projects"
          className="inline-block mt-6 px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
        >
          View My Work
        </Link>
      </section>

      {/* About Snippet */}
      <section className="mb-14 bg-white dark:bg-[#181818] rounded-lg p-6 transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          I’m a software developer with experience in .NET, React, WordPress, and full project delivery. Whether it’s a
          Blazor app for scaffold logistics or an NDIS-compliant web platform, I bring ideas to life with clean, maintainable
          code.
        </p>
        <Link to="/about" className="text-blue-600 hover:underline dark:text-blue-400">
          Learn more →
        </Link>
      </section>

      {/* Featured Projects */}
      <section className="mb-14 bg-gray-50 dark:bg-[#1e1e1e] rounded-lg py-12 px-6 transition-colors duration-300 shadow-inner">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            See all projects →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
