import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import './App.css';

// Generic 3D Mouse Tilt Wrapper

// Custom Cursor Implementation
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false };
      setTime("Raipur • " + now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on link click
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <div className="bg-grid-lines" />
        <CustomCursor />
        
        {/* Header (Persistent) */}
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLinkClick}>Koyna Tiwari</Link>
            
            <nav className="nav-links">
              <Link to="/#home" className="nav-link">About</Link>
              <Link to="/#work" className="nav-link">Projects</Link>
              <a href="https://docs.google.com/document/d/16c8GaeFKaemOQHy1SSu6diKtG_4pfAJRp-tzYzjw5L8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-link">Resume</a>
              <Link to="#contact" className="nav-link" onClick={() => {
                handleLinkClick();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>Contact</Link>
            </nav>

            <div className="header-actions">
              <span className="clock" suppressHydrationWarning>{time}</span>
              <button
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                className="nav-link theme-toggle"
                style={{ background: 'none', border: 'none', cursor: 'none', padding: 0, display: 'flex', alignItems: 'center' }}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLinkClick}>Koyna Tiwari</Link>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
              style={{ display: 'flex' }}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="mobile-menu-links">
            <Link to="/#home" className="mobile-menu-link" onClick={handleLinkClick}>Home</Link>
            <Link to="/#work" className="mobile-menu-link" onClick={handleLinkClick}>Projects</Link>
            <a href="https://docs.google.com/document/d/16c8GaeFKaemOQHy1SSu6diKtG_4pfAJRp-tzYzjw5L8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="mobile-menu-link" onClick={handleLinkClick}>Resume</a>
            <Link to="#contact" className="mobile-menu-link" onClick={() => {
              handleLinkClick();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>Contact</Link>
          </nav>

          <div className="mobile-menu-footer">
            <p>koynatiwari2911@gmail.com</p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
              <a href="https://www.behance.net/koynatiwari" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '0.9rem' }}>Behance</a>
              <a href="https://www.linkedin.com/in/koyna-tiwari-5594352a3" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '0.9rem' }}>LinkedIn</a>
            </div>
          </div>
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectCaseStudy />} />
          </Routes>
        </main>

        {/* Footer Section (Contact) */}
        <section id="contact" className="footer-swiss" style={{ position: 'relative', zIndex: 2 }}>
          <div className="container" style={{ maxWidth: '100%', padding: '0 2rem' }}>
            <div className="marquee-wrapper" style={{ overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginBottom: '8rem' }}>
              <div className="marquee-content footer-huge-text" style={{ marginBottom: 0 }}>
                <span className="marquee-item">Let's work together.&nbsp;&nbsp;</span>
                <span className="marquee-item">Let's work together.&nbsp;&nbsp;</span>
                <span className="marquee-item">Let's work together.&nbsp;&nbsp;</span>
                <span className="marquee-item">Let's work together.&nbsp;&nbsp;</span>
              </div>
            </div>

            <div className="footer-swiss-grid">
              <div className="footer-socials">
                <a href="https://www.behance.net/koynatiwari" target="_blank" rel="noopener noreferrer" className="footer-link">Behance ↗</a>
                <a href="https://www.linkedin.com/in/koyna-tiwari-5594352a3" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a>
                <a href="#" className="footer-link">Dribbble ↗</a>
              </div>

              <div className="footer-bio">
                I'm currently available for new work, let me know if you need a product designer. I'd love to talk about the next big thing!
              </div>
            </div>

            <div className="footer-swiss-bottom">
              <span>koynatiwari2911@gmail.com</span>
              <span>© Crafted by Koyna Tiwari</span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link" style={{ background: 'none', border: 'none', padding: 0 }}>
                ↑ Back to top
              </button>
            </div>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
