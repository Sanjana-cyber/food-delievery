import React, { useEffect, useRef } from 'react';
import { Navigation, BellRing, UserCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DashboardPreview = () => {
  const containerRef = useRef(null);
  const mockupRef = useRef(null);
  const innerElementsRef = useRef([]);

  useEffect(() => {
    // dramatic Parallax and fade-in effect on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(mockupRef.current,
      { opacity: 0, scale: 0.7, y: 150, rotationX: -15 },
      { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 1.5, ease: 'power4.out', transformPerspective: 1000 }
    )
    // Stagger inner elements of the dashboard
    .fromTo(innerElementsRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      "-=0.6"
    );
  }, []);

  return (
    <section id="preview" ref={containerRef} className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(139, 0, 0, 0.1) 100%)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: 800 }}>Intelligent <span className="text-gradient">Dashboard</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            A powerful, clean interface that puts your security controls right at your fingertips.
          </p>
        </div>

        {/* Mockup Container */}
        <div ref={mockupRef} className="glass-panel" style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '30px',
          borderRadius: '30px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 60px rgba(217, 28, 43, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          {/* Top Bar Mockup */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56' }}/>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e' }}/>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27c93f' }}/>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>Secure Connection Active</div>
          </div>

          {/* Inner Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '30px' }}>
            
            {/* Sidebar Mockup */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div ref={el => innerElementsRef.current[0] = el} style={{ background: 'rgba(217, 28, 43, 0.15)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--accent-red)' }}>
                <Navigation size={24} color="var(--accent-red)" /> <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Live Tracking</span>
              </div>
              <div ref={el => innerElementsRef.current[1] = el} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <BellRing size={24} color="var(--text-muted)" /> <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Alert History</span>
              </div>
              <div ref={el => innerElementsRef.current[2] = el} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <UserCheck size={24} color="var(--text-muted)" /> <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Trusted Circle</span>
              </div>
            </div>

            {/* Main Area Map Mockup */}
            <div ref={el => innerElementsRef.current[3] = el} style={{
              background: '#0a0a0a',
              borderRadius: '20px',
              minHeight: '350px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-glass)'
            }}>
              {/* Fake Map Elements */}
              <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'repeating-linear-gradient(45deg, #111 0, #111 2px, transparent 2px, transparent 30px)', opacity: 0.4 }} />
              <div style={{ 
                width: '80px', height: '80px', background: 'rgba(217, 28, 43, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1
              }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--accent-red)', borderRadius: '50%', padding: '0px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-8px', left: '-8px', right: '-8px', bottom: '-8px', borderRadius: '50%', border: '3px solid var(--accent-red)', animation: 'pulse 1.5s infinite ease-out' }} />
                </div>
              </div>
              
              <style>
                {`
                  @keyframes pulse {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(4); opacity: 0; }
                  }
                `}
              </style>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
