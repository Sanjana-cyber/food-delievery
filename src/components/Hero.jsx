import React, { useEffect, useRef } from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const bgCirclesRef = useRef(null);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline();
    tl.fromTo(headlineRef.current, 
      { opacity: 0, y: 100, scale: 0.8 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.5)', delay: 0.2 }
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo(btnRef.current,
      { opacity: 0, scale: 0.5, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' },
      "-=0.6"
    );

    // Parallax effect on scroll
    gsap.to(headlineRef.current, {
      y: 100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(bgCirclesRef.current, {
      y: 200,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section id="home" ref={heroRef} className="section-padding animated-bg" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass)',
          borderRadius: '20px',
          marginBottom: '24px',
          color: 'var(--accent-red)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <ShieldAlert size={18} /> Empowering Women Everywhere
        </div>
        
        <div ref={headlineRef}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '24px', fontWeight: 800 }}>
            Your Safety,<br />
            <span className="text-gradient">Our Priority</span>
          </h1>
        </div>
        
        <p ref={subRef} style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          Experience peace of mind with our cutting-edge security companion. Strong, secure, and built exclusively to empower you.
        </p>
        
        <div ref={btnRef} style={{ display: 'inline-block' }}>
          <a href="#features" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Get Started <ArrowRight size={20} />
          </a>
        </div>
      </div>
      
      {/* Decorative blurred circles for background effect */}
      <div ref={bgCirclesRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px',
          background: 'rgba(217, 28, 43, 0.3)', filter: 'blur(100px)', borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px',
          background: 'rgba(139, 0, 0, 0.4)', filter: 'blur(120px)', borderRadius: '50%'
        }}></div>
      </div>
    </section>
  );
};

export default Hero;
