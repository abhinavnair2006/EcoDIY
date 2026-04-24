import { useState } from 'react';
import axios from 'axios';
import './Submit.css';

function Submit() {
  const [formData, setFormData] = useState({
    title: '',
    materials: '',
    steps: '',
    difficulty: '',
    time: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await axios.post('http://localhost:5000/api/submit', formData);
      setStatus('success');
      setFormData({ title: '', materials: '', steps: '', difficulty: '', time: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="submit-container">
      <div className="form-wrapper glass animate-slide-up">
        <h2>Submit Your Project</h2>
        <p className="form-desc">Share your eco-friendly DIY project with the community. Projects will be reviewed by an admin before appearing on the Guides page.</p>

        {status === 'success' && <div className="alert success">Project submitted successfully! Waiting for admin approval.</div>}
        {status === 'error' && <div className="alert error">There was an error submitting your project.</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Project Title</label>
            <input type="text" id="title" className="form-control" value={formData.title} onChange={handleChange} required placeholder="E.g., Plastic Bottle Planter" />
          </div>

          <div className="input-group">
            <label htmlFor="materials">Materials Needed</label>
            <textarea id="materials" className="form-control" value={formData.materials} onChange={handleChange} required placeholder="List all materials used..." rows="3"></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="steps">Steps</label>
            <textarea id="steps" className="form-control" value={formData.steps} onChange={handleChange} required placeholder="Step by step instructions..." rows="5"></textarea>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select id="difficulty" className="form-control" value={formData.difficulty} onChange={handleChange} required>
                <option value="">Select Level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="time">Estimated Time</label>
              <input type="text" id="time" className="form-control" value={formData.time} onChange={handleChange} required placeholder="E.g., 2 hours" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting...' : 'Submit Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Submit;
