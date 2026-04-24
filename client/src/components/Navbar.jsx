import { Link } from 'react-router-dom';
import { Leaf, User } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Leaf className="logo-icon" />
          <span>EcoDIY Hub</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/submit">Submit</Link>
          <Link to="/about">About</Link>
        </nav>
        
        <div className="nav-actions">
          <Link to="/admin-login" className="admin-link">
            <User size={18} />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
