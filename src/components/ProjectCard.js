import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ title, description, tech, link }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Tech:</strong> {tech.join(', ')}</p>
      <Link to={link}>View Project →</Link>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
  }
};

export default ProjectCard;