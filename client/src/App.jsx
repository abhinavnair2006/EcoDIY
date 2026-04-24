import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Guides from './pages/Guides';
import Submit from './pages/Submit';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <AIChat />
    </>
  );
}

export default App;
