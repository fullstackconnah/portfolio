import React from 'react';

function Footer() {
  return (
    <footer className="z-50" style={styles.footer}>
      <p>© {new Date().getFullYear()} Connah Trotman. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '1rem 0',
    backgroundColor: '#111',
    color: '#fff',
    marginTop: '2rem'
  }
};

export default Footer;