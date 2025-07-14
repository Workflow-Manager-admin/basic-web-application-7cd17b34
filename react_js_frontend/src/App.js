import React, { useState, useEffect } from 'react';
import './App.css';

// Simple router for SPA navigation: no react-router needed for static content
const pages = {
  home: {
    label: 'Home',
    component: HomePage,
  },
  about: {
    label: 'About',
    component: AboutPage,
  },
  contact: {
    label: 'Contact',
    component: ContactPage,
  },
};

function HomePage() {
  return (
    <section className="content-section">
      <h2>Welcome to the React SPA Demo</h2>
      <p>
        This is a modern, light, and responsive single-page application created in ReactJS.  
        The design uses a clean layout, intuitive navigation, and a clear color palette.
      </p>
      <p>
        <span className="accent-text">ReactJS SPA Demo</span> demonstrates how to combine modern styling, theming, and navigation
        with a minimal footprint.
      </p>
    </section>
  );
}
function AboutPage() {
  return (
    <section className="content-section">
      <h2>About</h2>
      <p>
        This single-page application is built with ReactJS and vanilla CSS, following modern frontend practices.
        It exemplifies a modular structure, well-defined sections, and responsive design principles.
      </p>
      <ul>
        <li><b>Framework:</b> React 18</li>
        <li><b>Styling:</b> Custom CSS (no 3rd party UI frameworks)</li>
        <li><b>Navigation:</b> Simulated client-side (no refresh)</li>
        <li><b>Responsive:</b> Mobile-friendly layout</li>
      </ul>
    </section>
  );
}
function ContactPage() {
  return (
    <section className="content-section">
      <h2>Contact</h2>
      <p>You can reach out to the developer at:</p>
      <ul>
        <li>Email: <a href="mailto:developer@example.com">developer@example.com</a></li>
        <li>GitHub: <a href="https://github.com/" target="_blank" rel="noopener noreferrer">github.com</a></li>
      </ul>
    </section>
  );
}

// Header with navigation
function Header({ current, onNav }) {
  return (
    <header className="main-header">
      <div className="brand">
        <span className="brand-logo">⚡</span>
        <span className="brand-title">React SPA Demo</span>
      </div>
      <nav>
        <ul className="nav-list">
          {Object.keys(pages).map((key) => (
            <li key={key}>
              <button
                className={`nav-btn${current === key ? ' nav-btn-active' : ''}`}
                onClick={() => onNav(key)}
                aria-current={current === key ? 'page' : undefined}
              >
                {pages[key].label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// Footer
function Footer() {
  return (
    <footer className="main-footer">
      <span>
        &copy; React SPA Demo &middot; <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React {React.version}</a>
      </span>
    </footer>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme] = useState('light'); // Theme toggle disabled as per light theme requirement
  const [page, setPage] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle navigation (SPA, no reload)
  function navigate(key) {
    setPage(key);
    window.history.replaceState({}, '', `#${key}`);
  }

  // Load page from hash on mount/refresh
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (pages[hash]) setPage(hash);
    const onHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (pages[h]) setPage(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const PageComponent = pages[page] ? pages[page].component : HomePage;

  return (
    <div className="PageShell">
      <Header current={page} onNav={navigate} />
      <main className="main-content">
        <PageComponent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
