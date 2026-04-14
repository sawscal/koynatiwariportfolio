import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const skillsRef = useRef(null);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="swiss-content container">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="swiss-title-main"
          >
            <span className="swiss-asterisk">*</span> I'm Koyna Tiwari
          </motion.h1>

          <div className="swiss-mid-section">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="swiss-bio"
            >
              As an entry-level product designer, I focus on understanding users by asking the right questions and designing products that prioritize people and meaningful experiences.
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="swiss-heavy-text"
              >
                A designer
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="swiss-heavy-text-2"
              >
                lives by design
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="swiss-heavy-text"
                style={{ textAlign: 'center', fontWeight: 500, fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
              >
                & AI builds
              </motion.div>
            </div>
          </div>

          <div className="swiss-footer">
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} 
              className="nav-link" 
              style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'none' }}
            >
              Scroll &darr;
            </button>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
          <h2 className="section-title">Selected Work</h2>

          <div className="projects-grid">
            {[
              {
                id: "streetbites",
                title: "Streetbites",
                desc: "An application mapping user experiences to discover, track, and order from local street food vendors.",
                color: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)",
                image: "/assets/streetbite_hero.png"
              },
              {
                id: "fintech-mobile-application",
                title: "Fintech Mobile Application",
                desc: "Designed and built the entire user flow for a new-gen crypto trading platform currently used by 100K+ daily active users.",
                color: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
              },
              {
                id: "synapse-scholar",
                title: "Synapse Scholar",
                desc: "An AI-powered EdTech platform that transforms notes into interactive tutors, smart summaries, and adaptive quizzes.",
                color: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
                image: "/assets/synapse_hero_v4.png"
              }
            ].map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="project-card"
              >
                <Link to={`/project/${proj.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="project-image-container">
                    <div className="project-image" style={{ background: proj.color }}>
                      {proj.image && (
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      )}
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
          <h2 className="section-title">About</h2>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: 1.7,
            maxWidth: '480px',
            color: 'var(--text-primary)',
            marginTop: '2rem'
          }}>
            Hi, I'm Koyna Tiwari, an entry-level product designer with a background in AI and Machine Learning. I enjoy learning how thoughtful design and technology can work together to create intuitive digital experiences. As I continue to grow in the field, I'm passionate about exploring new ideas, improving my design skills, and building products that solve real user problems.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
          <h2 className="section-title">Experience</h2>

          {[
            { desc: "I'm interested in collaborating on meaningful projects where good design, creativity, and user experience are valued.", company: "Zivika", role: "Mobile Designer", period: "Jan 2025 – Mar 2025" }
          ].map((item, idx) => (
            <div key={idx} className="experience-item">
              <p style={{ fontSize: '1rem', lineHeight: 1.6, maxWidth: '280px', color: 'var(--text-secondary)', margin: 0 }}>
                {item.desc}
              </p>
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.company}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{item.role}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
          <h2 className="section-title">Skills</h2>

          <div ref={skillsRef} className="pegboard-container">
            <div className="pegboard-dots" />            {/* Polaroid: Design */}
            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card"
              style={{ top: '10px', left: '20px' }}
              initial={{ rotate: -5 }}
            >
              <div className="polaroid-image" style={{ background: '#f5f5f5', flexDirection: 'column', gap: '8px' }}>
                 <span style={{ fontSize: '2.5rem' }}>🎨</span>
                 <div style={{ fontSize: '0.65rem', color: '#888', textAlign: 'center', padding: '0 15px' }}>
                   Design Systems, IA, Research
                 </div>
              </div>
              <span className="polaroid-text">design skills</span>
            </motion.div>

            {/* Polaroid: AI & Dev */}
            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card"
              style={{ top: '15px', right: '30px' }}
              initial={{ rotate: 8 }}
            >
              <div className="polaroid-image" style={{ background: '#eef2ff' }}>
                 <span style={{ fontSize: '3rem' }}>🤖</span>
              </div>
              <span className="polaroid-text">ai & code</span>
            </motion.div>

            {/* Interactive Tool Cards */}
            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ top: '160px', left: '160px' }}
              initial={{ rotate: 10 }}
            >
              <div className="polaroid-image" style={{ background: '#FFF0ED' }}>
                <span style={{ fontSize: '1.8rem', color: '#F24E1E' }}>◈</span>
              </div>
              <span className="polaroid-text">Figma</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ bottom: '40px', left: '40px' }}
              initial={{ rotate: -12 }}
            >
              <div className="polaroid-image" style={{ background: '#f8f8f8' }}>
                <span style={{ fontSize: '1.8rem', color: '#000' }}>□</span>
              </div>
              <span className="polaroid-text">Framer</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ top: '10px', left: '300px' }}
              initial={{ rotate: 5 }}
            >
              <div className="polaroid-image" style={{ background: '#FFF9E6' }}>
                <span style={{ fontSize: '1.8rem', color: '#F8C12D' }}>◉</span>
              </div>
              <span className="polaroid-text">ProtoPie</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ bottom: '40px', left: '260px' }}
              initial={{ rotate: -8 }}
            >
              <div className="polaroid-image" style={{ background: '#F5F5F5' }}>
                <span style={{ fontSize: '1.8rem', color: '#111' }}>⚡</span>
              </div>
              <span className="polaroid-text">Cursor</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ top: '110px', right: '40px' }}
              initial={{ rotate: 15 }}
            >
              <div className="polaroid-image" style={{ background: '#E3F2FD' }}>
                <span style={{ fontSize: '1.8rem', color: '#027DFD' }}>💙</span>
              </div>
              <span className="polaroid-text">Flutter</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ bottom: '40px', right: '220px' }}
              initial={{ rotate: -5 }}
            >
              <div className="polaroid-image" style={{ background: '#F8F8F8' }}>
                <span style={{ fontSize: '1.5rem', color: '#000' }}>◎</span>
              </div>
              <span className="polaroid-text">Rive</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ top: '160px', left: '440px' }}
              initial={{ rotate: -5 }}
            >
              <div className="polaroid-image" style={{ background: '#F0F4FF' }}>
                <span style={{ fontSize: '1.8rem', color: '#5C7CFA' }}>🧠</span>
              </div>
              <span className="polaroid-text">LLM UX</span>
            </motion.div>

            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ top: '25px', right: '260px' }}
              initial={{ rotate: 12 }}
            >
              <div className="polaroid-image" style={{ background: '#F8F9FA' }}>
                <span style={{ fontSize: '1.8rem', color: '#111' }}>✦</span>
              </div>
              <span className="polaroid-text">Figma Make</span>
            </motion.div>
            <motion.div
              drag
              dragConstraints={skillsRef}
              className="polaroid-card-small"
              style={{ bottom: '40px', right: '50px' }}
              initial={{ rotate: -7 }}
            >
              <div className="polaroid-image" style={{ background: '#fff', display: 'flex', gap: '2px' }}>
                <svg width="40" height="60" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C12 8.68629 9.31371 6 6 6C2.68629 6 0 8.68629 0 12C0 15.3137 2.68629 18 6 18H12V12Z" fill="#F24E1E"/>
                  <path d="M12 0H6C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12H12V0Z" fill="#FF7262"/>
                  <path d="M24 6C24 2.68629 21.3137 0 18 0H12V12H18C21.3137 12 24 9.31371 24 6Z" fill="#A259FF"/>
                  <path d="M24 18C24 14.6863 21.3137 12 18 12H12V24H18C21.3137 24 24 21.3137 24 18Z" fill="#1ABCFE"/>
                  <path d="M12 24H6C2.68629 24 0 26.6863 0 30C0 33.3137 2.68629 36 6 36C9.31371 36 12 33.3137 12 30V24Z" fill="#0ACF83"/>
                </svg>
              </div>
              <span className="polaroid-text">Figma</span>
            </motion.div>
          </div>

          {/* Skills Grid for Mobile */}
          <div className="skills-grid-mobile">
            {[
              { icon: "🎨", name: "Design", tags: "Systems, IA, Research" },
              { icon: "🤖", name: "AI & Dev", tags: "Prompting, LLM UX" },
              { icon: "◈", name: "Figma", tags: "Design, Components" },
              { icon: "□", name: "Framer", tags: "Web, Interaction" },
              { icon: "◉", name: "ProtoPie", tags: "High-Fi, Testing" },
              { icon: "⚡", name: "Cursor", tags: "AI Dev, Workflow" },
              { icon: "💙", name: "Flutter", tags: "Mobile, Dart" },
              { icon: "◎", name: "Rive", tags: "Motion, Graphics" }
            ].map((skill, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="skill-card-mobile"
              >
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-tags">{skill.tags}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="try-moving-hint">Try moving things :)</div>
        </div>
      </section>
    </>
  );
};

export default Home;
