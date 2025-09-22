// Theme toggle with persistence
const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    themeToggleButton.textContent = next === 'dark' ? '🌙' : '☀️';
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Data (customize these arrays)
const EXPERIENCE = [
  { company: 'Coding Blocks', role: 'Machine learning Intern', period: 'June 2025 - Aug 2025', summary: 'Developed and validated ML models with automated pipelines, accelerating team experiments and improving iteration speed.' },
  { company: 'Chic-Fashions', role: 'Data & Operations Intern', period: 'March 2024 - Oct 2024', summary: 'Digitized import–export records and built Python/Excel workflows, improving data accuracy and operational efficiency.' },
  { company: 'HP Computers', role: 'Machine Learning Trainee', period: 'Oct 2023 - Dec 2023', summary: 'Implemented supervised ML solutions and standardized preprocessing pipelines, reducing setup time and enhancing reproducibility.' },
];

const PROJECTS = [
  {
    title: 'Financial Misinformation Detection',
    desc: 'NLP system using BERT/RoBERTa to classify financial news and detect misinformation with explainability.',
    link: 'https://financial-misinformation-detection.netlify.app/',   // 🔹 Add live link here
    repo: 'https://github.com/gauransh-juneja/FMD-COLING-2025',
    image: 'data:image/png;base64,...',
    tags: ['Python', 'BERT', 'NLP', 'HuggingFace']
  },
  {
    title: 'ChainSense-AI',
    desc: 'AI-powered demand forecasting and anomaly detection tool with natural language queries and Streamlit dashboard.',
    repo: 'https://github.com/gauransh-juneja/ChainSense-AI',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Python', 'LangChain', 'GroqAPI', 'Streamlit']
  },
  {
    title: 'Solar Flare Prediction Model',
    desc: 'Time-series ML models (XGBoost, LSTM, CNN) predicting solar flare events for satellite communication reliability.',
    repo: 'https://github.com/gauransh-juneja/Solar-Flare-Prediction-Model',
    image: 'data:image/jpeg;base64,...',
    tags: ['Python', 'XGBoost', 'LSTM', 'CNN']
  },
  {
    title: 'Hostel Plus',
    desc: 'Full-stack web app for hostel management with booking, Complaints and student dashboard.',
    link: 'https://hostel-plus.web.app/',   // 🔹 Already live
    repo: 'https://github.com/gauransh-juneja/Hostel-Plus',
    image: 'data:image/jpeg;base64,...',
    tags: ['React', 'Firebase', 'Node.js']
  },
  {
    title: 'BookCart',
    desc: 'React-based marketplace to buy and sell used books with wishlist and Telegram integration.',
    link: 'https://bookcart1.netlify.app/',   // 🔹 Add live link here
    repo: 'https://github.com/gauransh-juneja/BookCart',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'JavaScript', 'Firebase']
  }
];


const SKILLS = [
  'Python', 'C++', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 
  'NLP', 'Transformers', 'LangChain', 'SQL', 'MongoDB', 'React', 'Node.js', 
  'Express.js', 'Machine Learning', 'Deep Learning', 'Data Visualization'
];


// Render experience
const experienceList = document.getElementById('experience-list');
if (experienceList) {
  EXPERIENCE.forEach((job) => {
    const el = document.createElement('article');
    el.className = 'timeline-item';
    el.innerHTML = `
      <h3>${job.role} · ${job.company}</h3>
      <div class="meta">${job.period}</div>
      <p>${job.summary}</p>
    `;
    experienceList.appendChild(el);
  });
}

// Render projects
const projectsGrid = document.getElementById('projects-grid');
if (projectsGrid) {
  PROJECTS.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="project-card__body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div style="display:flex; gap:10px; margin-top: 6px;">
          ${p.link ? `<a class="btn small" href="${p.link}" target="_blank" rel="noreferrer noopener">Live</a>` : ''}
          <a class="btn small" href="${p.repo}" target="_blank" rel="noreferrer noopener">Code</a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}



// Render skills
const skillsList = document.getElementById('skills-list');
if (skillsList) {
  SKILLS.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    skillsList.appendChild(li);
  });
}

// Contact form validation and submission UX
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();

    const errors = {};
    if (!name) errors.name = 'Please enter your name';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
    if (!message) errors.message = 'Please enter a message';

    ['name', 'email', 'message'].forEach((field) => {
      const el = document.querySelector(`.error[data-for="${field}"]`);
      if (el) el.textContent = errors[field] || '';
    });
    if (Object.keys(errors).length) return;

    formStatus.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        formStatus.textContent = 'Thank you! I will get back to you soon.';
      } else {
        formStatus.textContent = 'Something went wrong. Please try again.';
      }
    } catch (err) {
      formStatus.textContent = 'Network error. Please try later.';
    }
  });
}





