import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: scrolled ? '15px 0' : '20px 0',
      borderBottom: scrolled ? '1px solid var(--border-glass)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield color="var(--accent-red)" size={32} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Empower</span>
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#home" className="nav-link active">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#preview" className="nav-link">Dashboard</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
