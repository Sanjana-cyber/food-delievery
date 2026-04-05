import React, { useEffect, useRef } from 'react';
import { Radio, MapPin, PhoneCall } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Radio size={36} color="#ffffff" />,
    title: 'SOS Alert',
    desc: 'Instantly notify your emergency contacts and local authorities with your live location with a single tap.'
  },
  {
    icon: <MapPin size={36} color="#ffffff" />,
    title: 'Live Location Tracking',
    desc: 'Share your real-time journey securely with trusted friends and family until you reach your destination safely.'
  },
  {
    icon: <PhoneCall size={36} color="#ffffff" />,
    title: 'Emergency Contacts',
    desc: 'Quick access to local helplines, police stations, and your priority circle in one secure place.'
  }
];

const Features = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Strong stagger animation on scroll
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 150, scale: 0.8, rotationX: 45 },
      {
        opacity: 1, 
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: 'back.out(1.4)',
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="features" ref={containerRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: 800 }}>Empowering <span className="text-gradient">Features</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Built with your security in mind. Our powerful tools provide instant response capabilities when you need them most.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {features.map((feature, i) => (
            <div 
              key={i} 
              ref={el => cardsRef.current[i] = el}
              className="glass-panel"
              style={{
                padding: '40px 30px',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(217, 28, 43, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(217, 28, 43, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
              }}
            >
              {/* Background Glow inside card */}
              <div style={{ 
                position: 'absolute', top: -50, right: -50, width: 100, height: 100, 
                background: 'rgba(217, 28, 43, 0.2)', filter: 'blur(40px)', zIndex: 0 
              }} />
              
              <div style={{ 
                background: 'linear-gradient(135deg, var(--accent-red), var(--accent-maroon))', 
                width: '70px', 
                height: '70px', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 10px 25px rgba(217, 28, 43, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', position: 'relative', zIndex: 1, fontWeight: 700 }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
