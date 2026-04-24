import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for now
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass animate-slide-up" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <Lock size={32} />
        </div>
        <h2 style={{ marginBottom: '2rem', color: 'var(--secondary)' }}>Admin Login</h2>
        
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
