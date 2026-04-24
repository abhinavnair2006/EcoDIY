import { Link } from 'react-router-dom';
import { Recycle, Lightbulb, Globe } from 'lucide-react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content animate-slide-up">
          <h1 className="hero-title">Turn Waste into <span className="highlight">Creative</span> DIY Projects</h1>
          <p className="hero-subtitle">
            Explore eco-friendly ideas and share your creativity with the world. 
            Join our community of makers upcycling everyday items.
          </p>
          <div className="hero-buttons">
            <Link to="/guides" className="btn btn-primary">Explore Projects</Link>
            <Link to="/submit" className="btn btn-outline">Share Your Idea</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon"><Recycle size={32} /></div>
            <h3>Reuse Materials</h3>
            <p>Convert waste items into useful and creative DIY products, reducing your carbon footprint.</p>
          </div>
          
          <div className="feature-card glass">
            <div className="feature-icon"><Lightbulb size={32} /></div>
            <h3>Creative Ideas</h3>
            <p>Discover innovative projects made by people like you. Get inspired to create.</p>
          </div>
          
          <div className="feature-card glass">
            <div className="feature-icon"><Globe size={32} /></div>
            <h3>Eco Friendly</h3>
            <p>Promote sustainability and reduce environmental waste in your daily life.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
