import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Dramatic Components ---
const SectionNumber = ({ num }: { num: string }) => (
  <span className="section-number-tag">
    ( {num} )
  </span>
);

const DramaticSubHeader = ({ title }: { title: string }) => (
  <h2 className="dramatic-header">
    {title}
  </h2>
);


// --- CRM / Professional Layout Components ---


// --- Persona Slider Component ---
const PersonaSlider = ({ personas }: { personas: any[] }) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % personas.length);
    }, 4000); // 4 seconds (2s pause + animation time)
    return () => clearInterval(timer);
  }, [personas.length]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="persona-grid"
        >
          <div>
            <h3 className="persona-name" style={{ fontSize: '5rem', fontWeight: 500, margin: 0 }}>{personas[index].name}</h3>
            <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>Age: {personas[index].age}</p>
          </div>
          <div>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.4, marginBottom: '3rem' }}>{personas[index].bio}</p>
            <div className="grid-responsive" style={{ gap: '2rem' }}>
              <div>
                <h5 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Goals</h5>
                <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, lineHeight: 1.8 }}>
                  {personas[index].goals.map((g: string, i: number) => <li key={i}>— {g}</li>)}
                </ul>
              </div>
              <div>
                <h5 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Frustrations</h5>
                <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, lineHeight: 1.8 }}>
                  {personas[index].frustrations.map((f: string, i: number) => <li key={i}>— {f}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4rem' }}>
        {personas.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? '40px' : '10px',
              height: '4px',
              background: i === index ? 'var(--bg-primary)' : 'rgba(0,0,0,0.1)',
              borderRadius: '2px',
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- Competitor Chart Component ---
const CompetitorChart = ({ data }: { data: any[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '4rem' }}>
    {data.map((item, idx) => (
      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>{item.platform}</span>
          <span style={{ opacity: 0.6 }}>{item.score}% Discovery Match</span>
        </div>
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${item.score}%` }}
            transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ 
              height: '100%', 
              background: item.platform === "Synapse Scholar" ? 'linear-gradient(90deg, #4facfe, #00f2fe)' : 'var(--text-secondary)',
              opacity: item.platform === "Synapse Scholar" ? 1 : 0.3,
              borderRadius: '99px'
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

// --- Data ---
const projectData: Record<string, any> = {
  "streetbites": {
    hero: { 
      title: "StreetBite", 
      subtitle: "Connecting food lovers with hidden street food gems through an intuitive discovery and ordering experience.", 
      gradient: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)",
      image: "/assets/streetbite_hero.png"
    },
    s1_overview: {
      intro: "StreetBite is a mobile application designed to bridge the gap between hungry foodies and local street food gems.",
      role: "UI/UX Designer",
      duration: "10 Weeks",
      tools: "Figma, FigJam"
    },
    s2_problem: "I grew up loving street food, but finding the good stuff was always a gamble. You’d hear about a legendary cart, but it was never where the maps said it was. Between the lack of digital presence for vendors and the constant anxiety over hygiene, most people just settled for random food decisions. StreetBite was born to fix that trust gap and bring these hidden vendors into the light.",
    s3_users: [
      { type: "Students", desc: "Always on a budget, looking for quick bites between classes." },
      { type: "Food Explorers", desc: "The 'hidden gem' seekers who value authenticity over brand names." },
      { type: "Busy Users", desc: "Professionals who need reliable, fast food without the hassle of a sit-down meal." }
    ],
    s3b_personas: [
      {
        name: "Aarav",
        age: 24,
        bio: "A final-year student who often finds himself hungry at 11 PM. He wants something authentic and cheap, but he's tired of walking to vendors only to find them closed or out of stock.",
        goals: ["Find affordable local food", "Verify vendor hygiene", "Know real-time availability"],
        frustrations: ["Pinned locations are often wrong", "No way to check menus online", "Uncertain hygiene standards"]
      },
      {
        name: "Priya",
        age: 29,
        bio: "A food blogger and weekend explorer. She travels specifically to find the 'next big thing' in street food but struggles with lack of vendor information and inconsistent quality.",
        goals: ["Discover unique local flavors", "Contribute reviews & photos", "Plan food trails across the city"],
        frustrations: ["Hard to find specific vendors", "Inconsistent food quality", "No central hub for ratings"]
      },
      {
        name: "Vikram",
        age: 35,
        bio: "A busy tech lead who loves street food but doesn't have time to wait in line. He needs a way to order ahead and pick up his meal without wasting 20 minutes standing by a cart.",
        goals: ["Pre-order and pick up", "Faster transaction times", "Consistent meal quality"],
        frustrations: ["Long wait times during rush hours", "Physical cash requirements", "Lack of order tracking"]
      }
    ],
    s4_research: [
      { insight: "Quick Decision Behavior", desc: "People choosing street food want to decide in under 120 seconds. Any friction kills the sale." },
      { insight: "Visual-First Trust", desc: "Users don't just read reviews; they look for recent photos of the cart and the food to judge hygiene." },
      { insight: "The Trust Gap", desc: "Verified 'active' status and recent ratings are the #1 driver for new user conversions." }
    ],
    s5_flow: "Open app → Discover → View vendor → Add to cart → Checkout → Track",
    s6_wireframes: "When I started sketching, I focused entirely on hierarchy. The goal was simple: get the user from the map to a food cart in as few taps as possible. I explored multiple layouts, eventually landing on a bottom-sheet discovery pattern that keeps the map visible at all times.",
    s7_ui: {
      lofi: "In the grayscale phase, I ignored color and focused strictly on the flow. I wanted to make sure the navigation felt natural even for someone using the app one-handed while walking through a crowded market.",
      hifi: "For the final look, I went with warm, food-inspired colors—deep reds and saffron oranges. It’s meant to look vibrant and appetizing while maintaining a very clean, high-contrast aesthetic that works well in direct sunlight.",
      components: ["Custom Buttons", "Vendor Food Cards", "Dynamic Navbar", "Search Bar", "Category Chips", "Cart Items"],
      variants: [
        { name: "Button States", states: "Default, Pressed, Disabled" },
        { name: "Food Cards", states: "Selected, Unavailable" },
        { name: "Category Chips", states: "Active, Inactive" },
        { name: "Nav Icons", states: "Selected, Unselected" }
      ]
    },
    s8_screens: [
      { name: "Home (Discovery)", desc: "A map-first experience designed for immediate discovery of nearby active vendors." },
      { name: "Menu Page", desc: "Transparent decision-making with high-res food shots and live hygiene ratings." },
      { name: "Cart & Checkout", desc: "A streamlined, friction-less flow optimized for quick transactions on the go." },
      { name: "Order Tracking", desc: "Real-time updates on your order status so you're never left guessing." }
    ],
    s9_prototype: "https://www.figma.com/proto/A1L1NirQp1b5J0OgPJ3l3G/StreetBytes?node-id=93-520&p=f&t=JNHTRnggoovAVfrY-1&scaling=scale-down&content-scaling=fixed&page-id=46%3A33&starting-point-node-id=49%3A55",
    s10_testing: [
      "Navigation was simplified to 3 core tabs after users found the menu too crowded.",
      "Primary actions (like 'Order Now') were enlarged for better visibility in outdoor conditions.",
      "We added a 'Top Rated' filter to the map for faster access to reliable vendors."
    ],
    s11_outcome: "The final result isn't just an app; it's a trust layer for street food. It made discovery actually reliable and gave vendors a digital identity they never had before, resulting in a significantly more confident user experience.",
    s12_learnings: [
      "Simplicity is the ultimate sophistication. Cutting features was often better than adding them.",
      "Visuals drive 90% of food decisions. High-quality vendor photos were non-negotiable.",
      "Small UX changes—like moving a button 8px closer to the thumb—have a massive impact on daily usability."
    ]
  },
  "fintech-mobile-application": {
    hero: { 
      title: "FinFlow", 
      subtitle: "Personal finance reimagined through clarity, intention, and healthy habits.", 
      gradient: "linear-gradient(120deg, #1e3a8a 0%, #10b981 100%)",
      image: "/assets/fintech_hero_final.png"
    },
    s1_overview: { 
      intro: "FinFlow is a minimal personal finance assistant designed to humanize how we track money. It moves away from complex spreadsheets to focus on visual clarity and growth.", 
      role: "UI/UX Designer", 
      duration: "12 Weeks", 
      tools: "Figma" 
    },
    s2_problem: "Money is inherently stressful. Most financial apps exacerbate this by presenting overwhelming data without context. Users struggle with consistent tracking because the process feels like a chore, and they lack clear, motivating insights into where their money actually goes.",
    s3_users: [
      { type: "Students", desc: "Managing tight budgets and looking for friction-less, quick expense logging." },
      { type: "Young Professionals", desc: "Balancing lifestyle goals with long-term savings and investment plans." },
      { type: "Habit Builders", desc: "Users wanting to transition from mindless spending to intentional financial growth." }
    ],
    s3b_personas: [
      {
        name: "Liam",
        age: 22,
        bio: "A recent graduate starting his first job. He wants to save for a laptop but finds that small, daily purchases (coffee, snacks) are draining his account without him realizing it.",
        goals: ["Track small daily expenses", "Set and reach savings goals", "Avoid month-end financial stress"],
        frustrations: ["Apps take too long to open/type", "Complex charts he doesn't understand", "No reminders to log spending"]
      },
      {
        name: "Sarah",
        age: 28,
        bio: "A marketing manager with a steady income but no clear budget. She wants to see 'the big picture' of her finances without spending hours on a spreadsheet every weekend.",
        goals: ["Visual breakdown of spending", "Smart insights on trends", "Consolidate all budgets in one place"],
        frustrations: ["Information overload", "Technical financial jargon", "Lack of personalized suggestions"]
      }
    ],
    s4_research: [
      { insight: "The 3-Second Rule", desc: "If adding an expense takes more than 3 seconds, users stop doing it. Speed is the primary driver of consistency." },
      { insight: "Hierarchy of Needs", desc: "Users care about three numbers most: Current Balance, Remaining Budget, and Progress toward their next Goal." },
      { insight: "Trust through Clarity", desc: "Minimalist designs with ample whitespace reduce financial anxiety and build user confidence." }
    ],
    s5_flow: "Open App → Scan Dashboard → Quick Add Expense → Review Analytics → Monitor Progress",
    s6_wireframes: "We prioritized 'Invisible Navigation.' Academic research into cognitive load led us to a dashboard-first strategy where the most critical data is always visible.",
    s7_ui: {
      lofi: "Low-fi wireframes focused strictly on the 'One-Tap Add' flow.",
      hifi: "The final look uses 'Calm Tech' aesthetics. Soft navy blues represent stability, while vibrant emerald greens symbolize growth.",
      components: ["Balance Cards", "Category Chips", "Predictive Numeric Pad", "Interactive Goal Bars", "Trend Graphs", "Insight Cards"],
      variants: [
        { name: "Button States", states: "Active, Hover, Loading, Disabled" },
        { name: "Expense Cards", states: "Highlighted, Standard, Selected" },
        { name: "Progress Bars", states: "Growth, Warning, Completed" },
        { name: "Notification Toasts", states: "Success, Insight, Alert" }
      ]
    },
    s8_screens: [
      { name: "Home", desc: "A high-level view of your financial heartbeat with the Money Vibe Check." },
      { name: "Insights", desc: "Deep-dives into spending patterns that tell a story, not just a number." },
      { name: "Analytics", desc: "Advanced trend analysis and predictive spending insights." },
      { name: "Financial Goals", desc: "Turning savings into a visual, rewarding journey with milestone counters." }
    ],
    s9_prototype: "https://www.figma.com/proto/D0BaP9osnzKNIB5JGHMEsR/Untitled?node-id=1-2&p=f&t=DsbKqKjEht3XmLhR-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    s10_testing: [
      "Simplified spending graphs after users found line-heavy charts confusing.",
      "Reduced the entry form from 5 fields to just 2 mandatory ones to increase logging speed.",
      "Changed 'Category labels' to be more human-centric (e.g., 'Moving Around' instead of 'Transport')."
    ],
    s11_outcome: "FinFlow transformed tracking from a chore into a habit.",
    s12_learnings: [
      "Simplicity is the final layer of complexity. It takes more work to make something feel simple.",
      "Empathy is a design tool. Understanding financial stress is key to building fintech trust.",
      "Mobile-first means designing for limited attention, not just limited screen space."
    ]
  },
  "synapse-scholar": {
    hero: { 
      title: "Synapse Scholar", 
      subtitle: "Transforming notes into interactive tutors, smart summaries, and adaptive quizzes with AI.", 
      color: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
      image: "/assets/synapse_hero.png"
    },
    s1_overview: { 
      intro: "Synapse Scholar is an AI-powered EdTech platform designed to help students learn smarter. It turns static notes into dynamic, interactive learning experiences.", 
      role: "UI/UX Designer", 
      duration: "8 Weeks", 
      tools: "Figma, FigJam" 
    },
    s2_problem: "Applying for scholarships usually feels like yelling into a void. I noticed students drowning in tabs, trying to track deadlines in messy spreadsheets, and applying for grants they weren't even eligible for. There’s a massive gap between 'finding a listing' and 'actually having a chance.' Information overload was the enemy, and a lack of personalized guidance was making students give up before they even started.",
    s3_users: [
      { type: "Active Applicants", desc: "Students actively hunting for funding for their current or upcoming semester." },
      { type: "Study Abroad Aspirants", desc: "Users navigating complex international requirements who need curated guidance." },
      { type: "Tracking Enthusiasts", desc: "Organized students who need a central hub to manage multiple ongoing applications." }
    ],
    s3b_personas: [
      {
        name: "Elena",
        age: 21,
        bio: "An undergrad seeking full-ride scholarships for her Master's in Europe. She’s overwhelmed by the sheer number of portals and often misses deadlines because her current tracking system (sticky notes) is failing her.",
        goals: ["Curated scholarship matches", "Automated deadline reminders", "Eligibility score check"],
        frustrations: ["Redundant application forms", "Vague eligibility criteria", "Missing critical deadlines"]
      },
      {
        name: "Kevin",
        age: 23,
        bio: "A first-generation college student looking for local community grants. He doesn't have a mentor and needs AI to tell him which scholarships he actually has a high probability of winning based on his profile.",
        goals: ["Simplified application steps", "Personalized 'Chance of Success' score", "Mentor-like AI guidance"],
        frustrations: ["Overly complex legal jargon", "No feedback on profile strength", "Information overload"]
      }
    ],
    s4_research: [
      { insight: "The 'Tab' Fatigue", desc: "Most users had 15+ tabs open when researching. They preferred a single-page dashboard that 'talks' to them instead of a static list." },
      { insight: "Trust in AI Score", desc: "Students felt more confident applying when they saw a numerical match percentage (e.g., '95% Match') than a general 'Recommended' tag." },
      { insight: "Simplified Tracking", desc: "Visual progress bars for each application stage (Draft, Submitted, Interview) significantly reduced user anxiety." }
    ],
    s4b_competitors: [
      { platform: "Synapse Scholar", score: 95 },
      { platform: "Scholarships.com", score: 65 },
      { platform: "Fastweb", score: 70 },
      { platform: "Cappex", score: 60 }
    ],
    s5_flow: "Open app → Create profile → Get AI recommendations → Track applications → Analyze progress",
    s6_wireframes: "I started with a 'dashboard-first' strategy. Academic data is heavy, so the challenge was making it feel light. I focused on a structured layout that keeps metrics visible but hides complex details until they're needed.",
    s7_ui: {
      lofi: "In the low-fi phase, I stripped away the 'AI' buzzwords and focused strictly on information hierarchy.",
      hifi: "For the final design, I went with a 'Calm Tech' aesthetic. We used deep blues and soft purple tones to evoke a sense of trust and focus.",
      components: ["Dashboard Cards", "Progress Trackers", "AI Recommendation Badges", "Global Nav", "Eligibility Metrics", "Deadline Tickers"],
      variants: [
        { name: "Scholarship Cards", states: "Matched, Applied, Saved" },
        { name: "Primary Buttons", states: "Default, Hover, Disabled" },
        { name: "Progress States", states: "Low, Medium, High Priority" },
        { name: "AI Badges", states: "High Match, Emerging" }
      ]
    },
    s8_screens: [
      { name: "Dashboard", desc: "A high-level overview of applications, upcoming deadlines, and profile strength." },
      { name: "Scholarship List", desc: "Curated cards showing match percentages and quick-apply options." },
      { name: "AI Recommendations", desc: "Personalized deep-dives into why specific grants fit your unique profile." }
    ],
    s9_prototype: "https://figma.com/placeholder-synapse-link",
    s10_testing: [
      "Simplified the dashboard after users found the first iteration too metric-heavy.",
      "Changed the 'Match Score' from a text label to a circular progress ring for better glanceability.",
      "Added a 'Quick Save' feature directly on the list view based on user feedback."
    ],
    s11_outcome: "The result is a platform that feels like a mentor, not just a database. Students reported feeling 40% less overwhelmed during their search.",
    s12_learnings: [
      "Data-heavy UI requires a very strict hierarchy to prevent user fatigue.",
      "AI features should be transparent—users trust the AI more when it explains 'Why' it recommended a scholarship.",
      "Simplicity isn't just about removing things; it's about organizing them so they feel invisible until needed."
    ],
    s4_brainstorming: {
      title: "Building the Information Architecture",
      desc: "Version 1 was built with including several new key features to the study dashboard. Some of them was including 'an edit and view mode' for AI tutors, separating actionable items from visual summaries, and introducing a new page called the 'Overview' page to lay out all important information and activity.",
      ia_image: "/assets/synapse_ia_diagram_1777029714324.png",
      sketch_desc: "After talking to both the student groups and observing how users worked with their notes during study sessions, I started sketching out my initial designs on Whimsical. I mapped all possible user paths and identified opportunities to reduce layers from 3-4 levels to 1-2.",
      sketch_image: "/assets/synapse_sketches_collage_1777029736413.png"
    },
    s7_redesign: {
      title: "The Redesign Strategy",
      desc: "For visual design, I worked within Synapse's existing design system but made strategic refinements. We prioritized 'Clarity over Density'—ensuring that every AI action results in a clear feedback loop through loading states, success confirmations, and explicit error messaging.",
      components_image: "/assets/synapse_design_system_v2_1777029758138.png",
      principles: [
        "Clarity over density",
        "Feedback at every action - loading states, success confirmations",
        "Added multi-state components for status tracking"
      ],
      refinements: [
        "Updated spacing system for better visual rhythm",
        "Created several multi-state components for study habits",
        "Introduced status color system (green = completed, yellow = pending)",
        "Made CTAs more prominent with increased contrast for focused study sessions"
      ]
    },
    deepDives: [
      {
        title: "The Main Dashboard (Overview)",
        subtitle: "The central hub for study tracking.",
        image: "/assets/synapse_overview_screen_v2_1777029777688.png",
        sections: [
          { label: "Left Section", val: "Intake information at-a-glance - study stage, personal info, semester info." },
          { label: "Middle Section", val: "The Case summary, pending AI sessions and tasks." },
          { label: "Right Sidebar", val: "Live activity feed showing the study journey - AI tutor audio recordings, notes uploaded with filters." }
        ],
        problem: "Users landed on the note portal (action-heavy), but students just needed status checks on their retention. This forced unnecessary navigation.",
        solution: "Created a new Overview page as the default landing showing note status, recent activity, key metrics, and quick actions.",
        rationale: "Data showed students visiting 2-3x more frequently but staying only 30 seconds. They just needed to check or update status. Serving this need first improved efficiency.",
        impact: "Status checks reduced from 45 seconds to 8 seconds. User satisfaction scores increased significantly."
      },
      {
        title: "Smart Library & Documents",
        subtitle: "Consolidating knowledge assets.",
        image: "/assets/synapse_library_screen_v2_1777029797497.png",
        sections: [
          { label: "Batch Access", val: "Introduced a batch download button for all study notes in a folder." },
          { label: "Metrics", val: "Included file counts and processing status updates in the tabular view." },
          { label: "Organization", val: "Grouped Notes, Dockets, and Summaries in a single layout." }
        ],
        problem: "AI Summaries were in a separate tab from Documents, creating confusion and extra navigation layers.",
        solution: "Consolidated summaries into the Documents section with a dedicated sub-tab. Made summarized content the default view.",
        rationale: "Mental model alignment—in users' minds, summaries ARE documents. Consolidation matched user expectations for knowledge management.",
        impact: "Note access time reduced by 60%. User interviews showed this significantly improved perceived ease of use."
      }
    ],
    gallery: "/assets/synapse_gallery_collage_1777029816477.png",
    final_metrics: [
      { label: "User Efficiency", val: "Task completion time decreased 42%", icon: "⚡" },
      { label: "Navigation", val: "Reduced layers from 3-4 to 1-2", icon: "🛤️" },
      { label: "Error Reduction", val: "Accidental edits down 78% via view-only default mode", icon: "🛡️" }
    ]
  }
};

const ProjectCaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const isStreetBite = id === 'streetbites';
  const isSynapseScholar = id === 'synapse-scholar';
  const isFintech = id === 'fintech-mobile-application';
  const project = id && projectData[id] ? projectData[id] : null;
  const p = project || projectData["streetbites"];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!project && id !== 'streetbites') return <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}><Link to="/">Return Home</Link></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="case-study-page"
    >
      <div className="container" style={{ paddingBottom: '10rem' }}>
        
        {/* --- Top Navigation --- */}
        <div style={{ paddingTop: '8rem', marginBottom: '4rem' }}>
          <Link to="/" className="nav-link" style={{ fontSize: '1rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            &larr; Return to Index
          </Link>
        </div>

        {/* --- Hero Section --- */}
        <section className="case-study-hero" style={{ paddingTop: '8rem' }}>
          <div>
            <motion.h1 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="case-study-title"
            >
              {p.hero.title}
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 1 }}
            style={{ paddingBottom: '1rem' }}
          >
            <p className="case-study-subtitle">
              {p.hero.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Cinematic Cover Image */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="case-study-cover"
          onClick={() => setSelectedImage(p.hero.image)}
        >
           <img 
             src={p.hero.image} 
             alt={p.hero.title} 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
           />
        </motion.div>

        {(isStreetBite || isSynapseScholar || isFintech) ? (
          // --- Custom 12-Section Human-Centric UI for StreetBite & Synapse Scholar ---
          <div className="case-study-content">
            
            {/* 1. Overview */}
            <section className="grid-responsive">
               <div>
                 <SectionNumber num="01 Overview" />
                 <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.s1_overview.intro}</p>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Role</span>
                   <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.2rem 0' }}>{p.s1_overview.role}</p>
                 </div>
                 <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Duration</span>
                   <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.2rem 0' }}>{p.s1_overview.duration}</p>
                 </div>
                 <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Tools</span>
                   <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.2rem 0' }}>{p.s1_overview.tools}</p>
                 </div>
               </div>
            </section>

            {/* 2. Problem */}
            <section style={{ padding: '6rem 0', borderTop: '2px solid var(--text-primary)', borderBottom: '2px solid var(--text-primary)' }}>
               <SectionNumber num="02 The Problem" />
               <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.4, margin: 0 }}>{p.s2_problem}</p>
            </section>

            {/* 3. Users */}
            <section className="grid-responsive" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
               <div>
                  <SectionNumber num="03 Target Users" />
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                  {p.s3_users.map((user: any, idx: number) => (
                    <div key={idx}>
                      <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{user.type}</h4>
                      <p style={{ color: 'var(--text-secondary)' }}>{user.desc}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Persona Section */}
            <section className="persona-section">
               <div className="persona-container">
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--bg-primary)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>( Personas )</span>
                  <div style={{ marginTop: '4rem' }}>
                    <PersonaSlider personas={p.s3b_personas} />
                  </div>
               </div>
            </section>

            {/* 4. Research */}
            <section>
               <SectionNumber num="04 Core Insights" />
               <DramaticSubHeader title={isStreetBite ? "Finding the trust gap." : "Understanding the hunt."} />
               <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '4rem' }}>
                  {p.s4_research.map((item: any, idx: number) => (
                    <div key={idx} style={{ padding: '3rem', background: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                       <h5 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.insight}</h5>
                       <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* 4b. Competitors (Synapse Only) */}
            {isSynapseScholar && p.s4b_competitors && (
              <section>
                <SectionNumber num="04b Competitor Analysis" />
                <DramaticSubHeader title="The trust advantage." />
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px' }}>
                  While legacy platforms focus purely on listing count, Synapse Scholar prioritizes **discovery match accuracy**—ensuring students only see grants they actually qualify for.
                </p>
                <CompetitorChart data={p.s4b_competitors} />
              </section>
            )}

            {/* 4c. Brainstorming & IA (Synapse Scholar Extension) */}
            {isSynapseScholar && p.s4_brainstorming && (
              <section style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                <div className="grid-responsive" style={{ alignItems: 'center' }}>
                   <div>
                     <SectionNumber num="04c Information Architecture" />
                     <DramaticSubHeader title={p.s4_brainstorming.title} />
                     <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '2rem' }}>
                       {p.s4_brainstorming.desc}
                     </p>
                   </div>
                   <div className="image-hover-zoom" style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--glass-border)', cursor: 'zoom-in', maxHeight: '400px', background: 'var(--bg-secondary)' }} onClick={() => setSelectedImage(p.s4_brainstorming.ia_image)}>
                      <img src={p.s4_brainstorming.ia_image} alt="Information Architecture" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                   </div>
                </div>

                <div className="grid-responsive" style={{ alignItems: 'center' }}>
                   <div className="image-hover-zoom" style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--glass-border)', cursor: 'zoom-in', maxHeight: '400px', background: 'var(--bg-secondary)' }} onClick={() => setSelectedImage(p.s4_brainstorming.sketch_image)}>
                      <img src={p.s4_brainstorming.sketch_image} alt="Initial Sketches" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   </div>
                   <div>
                     <h4 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Initial Ideas</h4>
                     <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                       {p.s4_brainstorming.sketch_desc}
                     </p>
                   </div>
                </div>
              </section>
            )}

            {/* 5. Flow */}
            <section style={{ textAlign: 'center' }}>
               <SectionNumber num="05 The Flow" />
                <div style={{ marginTop: '4rem', cursor: 'zoom-in', minHeight: '50vh', background: 'var(--bg-secondary)', borderRadius: '48px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)', padding: '2rem' }} onClick={() => setSelectedImage(isStreetBite ? "/assets/streetbite_flow.png" : (isFintech ? "/assets/fintech_architecture_flow.png" : "/assets/synapse_flow.png"))}>
                   {isStreetBite ? (
                     <img src="/assets/streetbite_flow.png" alt="StreetBite Flow" style={{ width: '100%', height: '100%', maxWidth: '1000px', objectFit: 'contain' }} />
                    ) : isFintech ? (
                     <img src="/assets/fintech_architecture_flow.png" alt="FinFlow Architecture & Flow" style={{ width: '100%', height: '100%', maxWidth: '1000px', objectFit: 'contain' }} />
                    ) : (
                     <img src="/assets/synapse_flow.png" alt="Synapse Flow" style={{ width: '100%', height: '100%', maxWidth: '1000px', objectFit: 'contain' }} />
                    )}
                </div>
            </section>

            {/* 6. Wireframes */}
            <section>
               <SectionNumber num="06 Lo-Fi Strategy" />
               <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px', marginBottom: '4rem' }}>{p.s6_wireframes}</p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div style={{ height: '45vh', background: 'var(--bg-secondary)', borderRadius: '32px', overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setSelectedImage(isStreetBite ? "/assets/streetbite_sketches.jpg" : (isFintech ? "/assets/fintech_lofi_sketch.png" : "/assets/synapse_lofi_sketch.png"))}>
                     {isStreetBite ? (
                        <img src="/assets/streetbite_sketches.jpg" alt="Early Sketches" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : isFintech ? (
                        <img src="/assets/fintech_lofi_sketch.png" alt="Fintech UI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src="/assets/synapse_lofi_sketch.png" alt="Dashboard Ideation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                  </div>
                  <div style={{ height: '45vh', background: 'var(--bg-secondary)', borderRadius: '32px', overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setSelectedImage(isStreetBite ? "/assets/streetbite_structure.jpg" : (isFintech ? "/assets/fintech_architecture_flow.png" : "/assets/synapse_structure.jpg"))}>
                      {isStreetBite ? (
                        <img src="/assets/streetbite_structure.jpg" alt="Structure Flow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : isFintech ? (
                        <img src="/assets/fintech_architecture_flow.png" alt="Fintech Architecture Flow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src="/assets/synapse_structure.jpg" alt="IA Mapping" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                  </div>
               </div>
            </section>

            {/* 7. UI Design */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
               <SectionNumber num="07 Visual Language" />

               {isSynapseScholar && p.s7_redesign && (
                 <div style={{ marginBottom: '4rem' }}>
                    <DramaticSubHeader title={p.s7_redesign.title} />
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', marginTop: '2rem' }}>
                      {p.s7_redesign.desc}
                    </p>
                    <div style={{ marginTop: '4rem', cursor: 'zoom-in', maxHeight: '600px', overflow: 'hidden', borderRadius: '40px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)' }} onClick={() => setSelectedImage(p.s7_redesign.components_image)}>
                       <img src={p.s7_redesign.components_image} alt="Design Components" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                    <div className="grid-responsive" style={{ marginTop: '4rem', gap: '4rem' }}>
                       <div>
                          <h5 style={{ fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Design Principles</h5>
                          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                             {p.s7_redesign.principles.map((pr: string, idx: number) => <li key={idx} style={{ fontSize: '1.1rem', opacity: 0.8 }}>⚡ {pr}</li>)}
                          </ul>
                       </div>
                       <div>
                          <h5 style={{ fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Specific Refinements</h5>
                          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                             {p.s7_redesign.refinements.map((rf: string, idx: number) => <li key={idx} style={{ fontSize: '1.1rem', opacity: 0.8 }}>◈ {rf}</li>)}
                          </ul>
                       </div>
                    </div>
                 </div>
               )}

               {/* 7A: Low Fidelity */}
               <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'center' }}>
                  <div style={{ height: '40vh', background: 'var(--bg-secondary)', borderRadius: '32px', overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setSelectedImage(isStreetBite ? "/assets/streetbite_lofi.png" : (isFintech ? "/assets/fintech_lofi_sketch.png" : "/assets/synapse_lofi_sketch.png"))}>
                     {isStreetBite ? (
                        <img src="/assets/streetbite_lofi.png" alt="Low Fidelity Wireframes" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : isFintech ? (
                        <img src="/assets/fintech_lofi_sketch.png" alt="Structural Layouts" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.8 }} />
                      ) : (
                        <img src="/assets/synapse_lofi_sketch.png" alt="Structural Layouts" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      )}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.25rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>A. Low-Fidelity</h5>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.s7_ui.lofi}</p>
                  </div>
               </div>

               {/* 7B: High Fidelity */}
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ fontSize: '1.25rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>B. High-Fidelity</h5>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.s7_ui.hifi}</p>
                  </div>
                  <div style={{ height: '50vh', background: 'var(--bg-secondary)', borderRadius: '32px', overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setSelectedImage(isStreetBite ? "/assets/streetbite_hifi.png" : (isFintech ? "/assets/fintech_hifi_collage.png" : "/assets/synapse_hifi.png"))}>
                      {isStreetBite ? (
                        <img src="/assets/streetbite_hifi.png" alt="High Fidelity Design" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : isFintech ? (
                        <img src="/assets/fintech_hifi_collage.png" alt="FinFlow UI Collage" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3, background: 'linear-gradient(45deg, #4facfe, #00f2fe)' }}>[ Minimal Tech UI ]</div>
                      )}
                  </div>
               </div>

                {/* 7C & 7D: Design System */}
                <div>
                   <h5 style={{ fontSize: '1.25rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '3rem' }}>C & D. Design System & Interaction</h5>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                      {/* Top: Image Area */}
                      <div style={{ height: '60vh', background: 'var(--bg-secondary)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', opacity: 1, border: '1px solid var(--glass-border)', overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setSelectedImage(isStreetBite ? "/assets/streetbite_design_system.png" : (isFintech ? "/assets/fintech_design_system.png" : "/assets/synapse_design_system.png"))}>
                         {isStreetBite ? (
                            <img src="/assets/design_system.png" alt="Design System" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          ) : isFintech ? (
                            <img src="/assets/fintech_design_system.png" alt="FinFlow Component System" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>[ Synapse Design Tokens ]</div>
                          )}
                      </div>
                      
                      {/* Bottom: Components & Variants Horizontal */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            {p.s7_ui.components.map((c: string, idx: number) => (
                              <span key={idx} style={{ padding: '0.6rem 1.2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '99px', fontSize: '0.9rem' }}>
                                {c}
                              </span>
                            ))}
                         </div>

                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                            {p.s7_ui.variants.map((v: any, idx: number) => (
                              <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem' }}>{v.name}</strong>
                                <span style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{v.states}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
            </section>

             {/* 7E. Deep Dives (Synapse Scholar Only) */}
             {isSynapseScholar && p.deepDives && (
               <section style={{ display: 'flex', flexDirection: 'column', gap: '12rem', padding: '10rem 0' }}>
                  {p.deepDives.map((dive: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                       <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                          <SectionNumber num={`Deep Dive 0${idx + 1}`} />
                          <h3 style={{ fontSize: '4rem', fontWeight: 500, margin: '1rem 0' }}>{dive.title}</h3>
                          <p style={{ fontSize: '1.5rem', opacity: 0.6 }}>{dive.subtitle}</p>
                       </div>

                       <div style={{ cursor: 'zoom-in', borderRadius: '40px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', maxHeight: '600px' }} onClick={() => setSelectedImage(dive.image)}>
                          <img src={dive.image} alt={dive.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                       </div>

                       <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 2fr)', gap: '6rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                             {dive.sections.map((sec: any, sIdx: number) => (
                               <div key={sIdx} style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{sec.label}</span>
                                  <p style={{ fontSize: '1.25rem', marginTop: '0.5rem', lineHeight: 1.4 }}>{sec.val}</p>
                               </div>
                             ))}
                          </div>

                          <div className="discovery-block" style={{ padding: '4rem', background: 'var(--bg-secondary)', borderRadius: '40px', border: '1px solid var(--glass-border)' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                                <div>
                                   <h6 style={{ fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1.5rem', letterSpacing: '0.1em' }}>Problem</h6>
                                   <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{dive.problem}</p>
                                </div>
                                <div>
                                   <h6 style={{ fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1.5rem', letterSpacing: '0.1em' }}>Solution</h6>
                                   <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{dive.solution}</p>
                                </div>
                                <div>
                                   <h6 style={{ fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1.5rem', letterSpacing: '0.1em' }}>Rationale</h6>
                                   <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{dive.rationale}</p>
                                </div>
                                <div>
                                   <h6 style={{ fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1.5rem', letterSpacing: '0.1em' }}>Impact</h6>
                                   <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{dive.impact}</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </section>
             )}


             {/* 8. Screens */}
             <section>
                 <DramaticSubHeader title={isStreetBite ? "The finished product." : (isFintech ? "Banking beautifully." : "A smarter scholarship journey.")} />
                 <div className="grid-responsive" style={{ marginTop: '4rem' }}>
                    {p.s8_screens.map((screen: any, idx: number) => (
                      <div key={idx}>
                        <motion.div 
                           whileHover={{ scale: 1.05, y: -10 }}
                           whileTap={{ scale: 0.98 }}
                           transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                           style={{ height: 'clamp(40vh, 60vw, 70vh)', background: 'var(--bg-secondary)', borderRadius: '32px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (isStreetBite || isFintech) ? 'zoom-in' : 'default', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                           onClick={() => {
                             if (isStreetBite) {
                               if (screen.name === "Home (Discovery)") setSelectedImage("/assets/streetbite_home.png");
                               if (screen.name === "Order Tracking") setSelectedImage("/assets/streetbite_status.png");
                               if (screen.name === "Cart & Checkout") setSelectedImage("/assets/streetbite_checkout.png");
                               if (screen.name === "Menu Page") setSelectedImage("/assets/streetbite_menu.png");
                             }
                             if (isFintech) {
                               if (screen.name === "Home") setSelectedImage("/assets/fintech_home_screen.png");
                               else if (screen.name === "Insights") setSelectedImage("/assets/fintech_insights_screen.png");
                               else if (screen.name === "Analytics") setSelectedImage("/assets/fintech_analytics_screen.png");
                               else if (screen.name === "Financial Goals") setSelectedImage("/assets/fintech_goals_screen.png");
                               else setSelectedImage("/assets/fintech_mockup.png");
                             }
                           }}
                         >
                           {isStreetBite ? (
                             screen.name === "Home (Discovery)" ? <img src="/assets/streetbite_home.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             screen.name === "Order Tracking" ? <img src="/assets/streetbite_status.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             screen.name === "Cart & Checkout" ? <img src="/assets/streetbite_checkout.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             screen.name === "Menu Page" ? <img src="/assets/streetbite_menu.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             <div style={{ width: '100%', height: '100%', background: 'var(--bg-secondary)', borderRadius: '32px' }}></div>
                           ) : isFintech ? (
                             screen.name === "Home" ? <img src="/assets/fintech_home_screen.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             screen.name === "Insights" ? <img src="/assets/fintech_insights_screen.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             screen.name === "Analytics" ? <img src="/assets/fintech_analytics_screen.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             screen.name === "Financial Goals" ? <img src="/assets/fintech_goals_screen.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} /> :
                             <img src="/assets/fintech_mockup.png" alt={screen.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} />
                           ) : (
                             <div style={{ width: '100%', height: '100%', border: '1px solid var(--glass-border)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>[ {screen.name} ]</div>
                           )}
                        </motion.div>
                        <h6 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{screen.name}</h6>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{screen.desc}</p>
                      </div>
                    ))}
                </div>
             </section>

            {/* 9. Prototype */}
            <section style={{ textAlign: 'center', padding: '6rem 0', borderTop: '1px solid var(--glass-border)' }}>
               <SectionNumber num="09 Prototype" />
               <motion.a 
                 href={p.s9_prototype} 
                 target="_blank" 
                 rel="noreferrer"
                 whileHover={{ scale: 1.02 }}
                 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '4px solid var(--text-primary)', paddingBottom: '0.5rem' }}
               >
                 🔗 View Figma Prototype
               </motion.a>
            </section>

            {/* 10. Testing */}
            <section>
               <SectionNumber num="10 Usability Testing" />
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                  {p.s10_testing.map((item: string, idx: number) => (
                    <div key={idx} style={{ padding: '2rem', background: 'var(--glass-bg)', borderLeft: '4px solid var(--text-primary)', borderRadius: '0 16px 16px 0' }}>
                       <p style={{ margin: 0, fontWeight: 500 }}>{item}</p>
                    </div>
                  ))}
               </div>
            </section>

                         {/* 11. Outcome */}
             <section style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '6rem', borderRadius: '40px' }}>
                <SectionNumber num="11 The Impact" />
                
                {isSynapseScholar && p.final_metrics ? (
                  <div className="grid-responsive" style={{ gap: '4rem', alignItems: 'start' }}>
                    <div style={{ flex: 1.5 }}>
                      <p style={{ fontSize: '2.5rem', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>{p.s11_outcome}</p>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {p.final_metrics.map((m: any, idx: number) => (
                        <div key={idx} style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                           <span style={{ fontSize: '2.5rem' }}>{m.icon}</span>
                           <div>
                             <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--bg-primary)' }}>{m.label}</strong>
                             <span style={{ opacity: 0.8, color: 'var(--bg-primary)' }}>{m.val}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: '2.5rem', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>{p.s11_outcome}</p>
                )}
             </section>

            {/* 12. Learnings */}
            <section style={{ textAlign: 'center' }}>
               <SectionNumber num="12 Reflections" />
               <div className="grid-responsive" style={{ marginTop: '3rem' }}>
                 {p.s12_learnings.map((l: string, idx: number) => (
                   <div key={idx}>
                      <p style={{ fontSize: '1.5rem', fontWeight: 500 }}>{l}</p>
                   </div>
                 ))}
               </div>
            </section>

          </div>
        ) : (
          // --- Standard Fallback for others ---
          <div className="case-study-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
             <SectionNumber num="Work in Progress" />
             <DramaticSubHeader title="Full case study coming soon." />
             <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>I'm currently documenting the process for this project.</p>
          </div>
        )}

        {/* --- End Footer --- */}
        <div style={{ textAlign: 'center', paddingTop: '6rem', marginTop: '12rem', borderTop: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '3rem', opacity: 0.5 }}>- FIN -</h3>
          <Link to="/" className="nav-link" style={{ fontSize: '1.2rem', padding: '1.2rem 3.5rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '99px', textDecoration: 'none', fontWeight: 600 }}>
            Return to Index
          </Link>
        </div>

      </div>
      {/* --- Lightbox Modal --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 5vw, 4rem)',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Quick View" 
                style={{ 
                  display: 'block', 
                  maxWidth: '90vw', 
                  maxHeight: '90vh', 
                  borderRadius: '12px',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
                }} 
              />
              <button 
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '-3rem',
                  right: 0,
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600
                }}
              >
                Close (ESC)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCaseStudy;
