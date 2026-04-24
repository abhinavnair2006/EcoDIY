import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, TrendingUp } from 'lucide-react';
import './Guides.css';

function Guides() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetching from the Express backend
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guides-container">
      <div className="guides-header animate-slide-up">
        <h1>Explore Creative DIY Projects</h1>
        <p>Browse ideas shared by the community and start building.</p>
      </div>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="no-projects">No approved projects yet. Be the first to submit!</div>
      ) : (
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div key={proj._id || idx} className="project-card glass animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              {proj.image ? (
                <img src={proj.image} alt={proj.title} className="project-img" />
              ) : (
                <div className="project-img-placeholder">EcoDIY Hub</div>
              )}
              <div className="project-content">
                <h3>{proj.title}</h3>
                
                <div className="project-meta">
                  <span className="meta-tag difficulty">
                    <TrendingUp size={14} /> {proj.difficulty || 'Medium'}
                  </span>
                  <span className="meta-tag time">
                    <Clock size={14} /> {proj.time || '1 hr'}
                  </span>
                </div>

                <div className="project-section">
                  <h4>Materials:</h4>
                  <p>{proj.materials}</p>
                </div>

                <div className="project-section">
                  <h4>Steps:</h4>
                  <p className="steps-text">{proj.steps}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Guides;
