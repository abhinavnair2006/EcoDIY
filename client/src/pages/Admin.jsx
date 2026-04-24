import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check, Trash2, LogOut } from 'lucide-react';
import './Admin.css';

function Admin() {
  const [pending, setPending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-login');
      return;
    }
    fetchPending();
  }, [navigate]);

  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pending');
      setPending(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/approve/${id}`);
      fetchPending();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      fetchPending();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  return (
    <div className="admin-container animate-fade-in">
      <div className="admin-header glass">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="admin-content">
        <h3 className="section-title">Pending Projects ({pending.length})</h3>
        
        {pending.length === 0 ? (
          <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)', borderRadius: '1rem' }}>
            No pending projects to review.
          </div>
        ) : (
          <div className="admin-grid">
            {pending.map((proj) => (
              <div key={proj._id} className="admin-card glass">
                <h4>{proj.title}</h4>
                <p><strong>Difficulty:</strong> {proj.difficulty}</p>
                <p><strong>Time:</strong> {proj.time}</p>
                <div className="admin-card-actions">
                  <button className="action-btn approve" onClick={() => handleApprove(proj._id)}>
                    <Check size={16} /> Approve
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(proj._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
