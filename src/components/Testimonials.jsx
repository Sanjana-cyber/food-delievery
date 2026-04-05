import React, { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const testimonials = [
  {
    quote: "Empower has completely changed my late-night commutes. I feel secure knowing help is just one tap away. The strong interface makes me feel safe.",
    name: "Sarah Jenkins",
    role: "Regular Commuter"
  },
  {
    quote: "The live location sharing is incredibly accurate. My family rests easy knowing exactly where I am on my journeys. It is a must-have app.",
    name: "Priya Sharma",
    role: "University Student"
  },
  {
    quote: "A beautifully designed app that doesn't compromise on functionality. It's strong, reliable, and fundamentally empowering for everyone.",
    name: "Elena Rodriguez",
    role: "Night Shift Worker"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    // Animate slide in when index changes
    gsap.fromTo(slideRef.current,
      { opacity: 0, x: 100, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, [currentIndex]);

  const nextSlide = () => {
    gsap.to(slideRef.current, {
      opacity: 0, x: -100, scale: 0.95, duration: 0.3, ease: 'power3.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    });
  };

  const prevSlide = () => {
    gsap.to(slideRef.current, {
      opacity: 0, x: 100, scale: 0.95, duration: 0.3, ease: 'power3.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      }
    });
  };

  return (
    <section id="testimonials" className="section-padding">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Trusted by <span className="text-gradient">Thousands</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Hear from the women who rely on Empower every day for their peace of mind.
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', padding: '0 50px' }}>
          <button onClick={prevSlide} style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 10
          }}>
            <ChevronLeft size={24} />
          </button>

          <div ref={slideRef} className="glass-panel" style={{ padding: '40px', position: 'relative', textAlign: 'center' }}>
            <Quote size={50} color="rgba(217, 28, 43, 0.2)" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 0 }} />
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#fff', lineHeight: 1.8, marginBottom: '30px', position: 'relative', zIndex: 1 }}>
              "{testimonials[currentIndex].quote}"
            </p>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-red)' }}>{testimonials[currentIndex].name}</h4>
              <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>{testimonials[currentIndex].role}</div>
            </div>
          </div>

          <button onClick={nextSlide} style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 10
          }}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
