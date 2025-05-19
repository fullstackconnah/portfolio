import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function Home() {
  const featuredProjects = [
    {
      title: 'SmartScaff App',
      description: 'A full-stack Blazor app for managing scaffold inventory, images, and documents.',
      tech: ['Blazor', '.NET', 'SQL'],
      link: '/projects#smartscaff'
    },
    {
      title: 'Oassist Website',
      description: 'A responsive WordPress site with custom holiday filtering and Elementor design.',
      tech: ['WordPress', 'Pods', 'Search & Filter Pro'],
      link: '/projects#oassist'
    },
    {
      title: 'Portfolio Site',
      description: 'This site — built with React and React Router to showcase my work.',
      tech: ['React', 'JSX', 'GitHub Pages'],
      link: '/projects#portfolio'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1>Hi, I'm Connah 👋</h1>
        <p>I build scalable full-stack apps, custom WordPress sites, and solve real-world problems with code.</p>
        <Link to="/projects" style={styles.cta}>View My Work</Link>
      </section>

      {/* About Snippet */}
      <section style={styles.section}>
        <h2>About Me</h2>
        <p>I’m a software developer with experience in .NET, React, WordPress, and full project delivery. Whether it’s a Blazor app for scaffold logistics or an NDIS-compliant web platform, I bring ideas to life with clean, maintainable code.</p>
        <Link to="/about">Learn more →</Link>
      </section>

      {/* Featured Projects */}
      <section style={styles.section}>
        <h2>Featured Projects</h2>
        <div style={styles.cardGrid}>
          {featuredProjects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
        <Link to="/projects">See all projects →</Link>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  hero: {
    marginBottom: '3rem',
    textAlign: 'center',
  },
  section: {
    marginBottom: '2.5rem',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  cta: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.5rem 1.25rem',
    background: '#111',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};

export default Home;
