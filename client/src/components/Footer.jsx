import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} EcoDIY Hub | Built for Academic Project</p>
        <p className="footer-sub">Making the world greener, one project at a time.</p>
      </div>
    </footer>
  );
}

export default Footer;
