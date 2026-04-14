import React from 'react';
import { motion } from 'framer-motion';

const AIPage = () => {
  const builds = [
    { 
      title: "Claude Iterate", 
      desc: "Break out of the linearity of chat when interacting with Claude. Tell Claude what you like or dislike and ask it to make inline changes. Solving for human x AI collaboration.",
      link: "#"
    },
    { 
      title: "Interactive turntable", 
      desc: "Digital nostalgia brought into a modern spatial UI space. Built using Figma Make, Claude, and Cursor.",
      link: "#"
    },
    { 
      title: "Strava x Running", 
      desc: "Web app to track runs, pulling data directly from Strava. Designed in Figma and built using Cursor and Claude Code.",
      link: "#"
    },
    { 
      title: "Is originality dead?", 
      desc: "Deep dive into the fate of YC companies and their founders. Built charts using React and Framer components.",
      link: "#"
    },
    { 
      title: "Trading simulator", 
      desc: "Experience the thrill of options trading. Designed in Figma and built with Figma Make.",
      link: "#"
    },
    { 
      title: "Figma plugin for YC", 
      desc: "To solve the hassle of manual copy-pasting, I built a Figma plugin using Cursor to design with real data.",
      link: "#"
    }
  ];

  return (
    <div className="ai-page-container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}
        >
          Sketching in code with AI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500 }}
        >
          I treat code as my canvas and AI as my brush.
        </motion.p>
      </header>

      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {builds.map((build, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{
                background: 'var(--bg-secondary)',
                padding: '3rem',
                borderRadius: '40px',
                border: '1px solid var(--glass-border)',
                transition: 'transform 0.4s ease',
                cursor: 'none'
              }}
              whileHover={{ y: -5, borderColor: 'var(--text-primary)' }}
            >
              <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>{build.title}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px' }}>
                {build.desc}
              </p>
              <a 
                href={build.link} 
                className="nav-link" 
                style={{ fontSize: '1rem', fontWeight: 600, padding: '0.8rem 1.5rem', border: '1px solid var(--glass-border)', borderRadius: '99px', width: 'fit-content', display: 'inline-block' }}
              >
                See it live ↗
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPage;
