import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#030303', borderTop: '1px solid var(--border-glass)', padding: '60px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px', marginBottom: '40px' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Shield color="var(--accent-red)" size={28} />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Empower</span>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, fontSize: '0.9rem' }}>
              Dedicated to creating safer environments and empowering women globally through technology.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '60px' }}>
            <div>
              <h4 style={{ marginBottom: '16px', color: '#fff' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Careers</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', color: '#fff' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Safety Guide</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Blog</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Support</a></li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} Empower Security. All rights reserved. Your Safety, Our Priority.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
