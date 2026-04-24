import React from 'react';

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }} className="glass animate-slide-up">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>About EcoDIY Hub</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
        EcoDIY Hub is created to encourage people to reuse waste materials and turn them into useful DIY products. 
        Our mission is to foster a community of environmentally conscious creators who see potential where others see trash.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
        <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Our Vision</h3>
          <p>A world where creativity drives sustainability, minimizing waste through innovative upcycling.</p>
        </div>
        <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Join Us</h3>
          <p>Whether you're a seasoned crafter or a beginner, your ideas can inspire others. Share your projects today!</p>
        </div>
      </div>
    </div>
  );
}

export default About;
