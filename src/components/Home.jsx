import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./style.css";
import latus1 from "./assets/latus.png";
import latus2 from "./assets/latus2.png";
import tomato1 from "./assets/tomato.png";
import tomato2 from "./assets/tomato2.png";
import burgerMain from "./assets/burger3.png";
import plate from "./assets/plate.png";
import latusDecor from "./assets/latus4.png";
import cocaCola from "./assets/cocacola.png";
import pepsi from "./assets/pepsi.png";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    console.log("Sethi Burger Application Initialized.");

    // Z-Index setup
    gsap.set(".hero-layers", { zIndex: 100 });
    gsap.set(".hero-layers", { clearProps: "all" });
    gsap.set(".about-plate", { zIndex: 1 });
    gsap.set(".latus1",      { zIndex: 20 });
    gsap.set(".latus2",      { zIndex: 22 });
    gsap.set(".tamato1",     { zIndex: 29 });
    gsap.set(".tamato2",     { zIndex: 28 });
    gsap.set(".burger-main", { zIndex: 50 });

    // Helper: translate element to target point
    const getTranslation = (elementSelector, targetSelector, targetXRat, targetYRat) => {
      const el     = document.querySelector(elementSelector);
      const target = document.querySelector(targetSelector);
      if (!el || !target) return { x: 0, y: 0 };

      const originalTransform = el.style.transform;
      el.style.transform = "none";
      const sourceRect = el.getBoundingClientRect();
      el.style.transform = originalTransform;

      const targetRect = target.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width  * targetXRat;
      const targetY = targetRect.top  + targetRect.height * targetYRat;
      const sourceX = sourceRect.left + sourceRect.width  * 0.5;
      const sourceY = sourceRect.top  + sourceRect.height * 0.5;

      return { x: targetX - sourceX, y: targetY - sourceY };
    };

    // ============================================
    // STAGE 1: Hero → About (Burger + Ingredients)
    // ============================================
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 90%",
        end:   "top 40%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Burger → plate center
    tl1.to(".burger-main", {
      x:     () => getTranslation(".burger-main", ".about-plate", 0.5, 0.5).x,
      y:     () => getTranslation(".burger-main", ".about-plate", 0.5, 0.55).y - 150,
      scale: 0.75,
      ease:  "power2.inOut",
    }, "tl1");

    // Tomato1 → left bottom of plate
    tl1.to(".tamato1", {
      x:        () => getTranslation(".tamato1", ".about-plate", 0.45, 0).x,
      y:        () => getTranslation(".tamato1", ".about-plate", 0, 0.98).y,
      scale:    0.7,
      rotation: -25,
      ease:     "power2.inOut",
    }, "tl1");

    // Tomato2 → right side
    tl1.to(".tamato2", {
      x:        () => getTranslation(".tamato2", ".about-plate", 0.85, 0).x,
      y:        () => getTranslation(".tamato2", ".about-plate", 0, 0.5).y,
      scale:    0.7,
      rotation: 30,
      ease:     "power2.inOut",
    }, "tl1");

    // Plate tomato center
    tl1.to(".plate-tomato-center", {
      scale:   1,
      opacity: 1,
      y:       -10,
      ease:    "back.out(2)",
    }, "tl1+=0.3");

    // Latus1 → fall left
    tl1.to(".latus1", {
      x:        () => getTranslation(".latus1", ".about-plate", 0.25, 0).x,
      y:        () => getTranslation(".latus1", ".about-plate", 0, 0.65).y,
      scale:    0.7,
      rotation: -25,
      ease:     "bounce.out",
    }, "tl1+=0.2");

    // Latus2 → fall right
    tl1.to(".latus2", {
      x:        () => getTranslation(".latus2", ".about-plate", 0.75, 0).x,
      y:        () => getTranslation(".latus2", ".about-plate", 0, 0.65).y,
      scale:    0.7,
      rotation: 25,
      ease:     "bounce.out",
    }, "tl1+=0.25");

    // ============================================
    // STAGE 2: About → Drinks (Burger ONLY)
    // ============================================
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".drinks-section",
        start: "top 80%",
        end:   "top 30%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl2.to(".burger-main", {
      x:     () => getTranslation(".burger-main", ".empty-card", 0.5, 0).x,
      y:     () => getTranslation(".burger-main", ".empty-card", 0, 0.45).y,
      scale: () => (window.innerWidth < 900 ? 0.45 : 0.55),
      ease:  "power2.inOut",
    });

    // ============================================
    // STAGE 3: Drinks — Cards split & return
    // ============================================
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".drinks-section",
        start: "top 80%",
        end:   "top 30%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    const shift = window.innerWidth < 900 ? 120 : 220;
    const lift  = window.innerWidth < 900 ?  80 : 140;

    tl3
      // Step 1 → strong diagonal push outward
      .to(".drink-card:nth-child(1)", {
        x: -shift, y: -lift, rotation: -20, scale: 0.9, ease: "power2.inOut",
      }, 0)
      .to(".drink-card:nth-child(3)", {
        x:  shift, y: -lift, rotation:  20, scale: 0.9, ease: "power2.inOut",
      }, 0)

      // Step 2 → extra push as burger enters
      .to(".drink-card:nth-child(1)", {
        x: -(shift + 80), y: -(lift + 60), rotation: -30, ease: "power2.inOut",
      }, 0.35)
      .to(".drink-card:nth-child(3)", {
        x:  (shift + 80), y: -(lift + 60), rotation:  30, ease: "power2.inOut",
      }, 0.35)

      // Step 3 → snap back
      .to(".drink-card:nth-child(1)", {
        x: 0, y: 0, rotation: 0, scale: 1, ease: "back.out(2)",
      }, 0.7)
      .to(".drink-card:nth-child(3)", {
        x: 0, y: 0, rotation: 0, scale: 1, ease: "back.out(2)",
      }, 0.7);

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
    <div  className="home-page">

      {/* HEADER */}
      <header>
        <nav className="navbar">
          <div className="brand">
            <span className="brand-name">Sethi burger</span>
            <span className="burger-emoji">🍔</span>
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Order</a></li>
            <li><a href="#">Reviews</a></li>
          </ul>
          <div className="nav-right">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <h1 className="hero-text">BURGER</h1>
            <div className="hero-layers">
              <img src={latus1}     alt="Lettuce Background" className="ingredient latus1"  />
              <img src={tomato1}    alt="Tomato Background"  className="ingredient tamato1" />
              <img src={burgerMain} alt="Premium Burger"     className="burger-main"        />
              <img src={latus2}     alt="Lettuce Foreground" className="ingredient latus2"  />
              <img src={tomato2}    alt="Tomato Foreground"  className="ingredient tamato2" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-container">
            <div className="about-left">
              <img src={plate} alt="Plate" className="about-plate" />
            </div>
            <div className="about-right">
              <h2>About Our Burger Shop</h2>
              <p>
                Welcome to Sethi Burger, where passion for culinary excellence meets the
                ultimate comfort food. We believe that a great burger is an experience,
                which is why we meticulously source only the freshest, locally-grown
                ingredients and premium quality meats. Our commitment to handcrafted
                perfection is baked into every toasted sesame seed bun, layered into our
                melting artisanal cheeses, and grilled into our juicy signature patties.
                <br /><br />
                Whether you are craving a classic cheeseburger or an adventurous new
                flavor combination, our modern, dark-themed atmosphere and premium
                standards ensure that every bite is unforgettable.
              </p>
            </div>
          </div>
        </section>

        {/* Drinks Section */}
        <section className="drinks-section">
          <div className="drinks-container">

            {/* Card 1 — Coca Cola */}
            <div className="drink-card">
              <img src={latusDecor} alt="Lettuce Decor" className="drink-decor" />
              <img src={cocaCola}   alt="Coca Cola"     className="drink-img"   />
              <h3 className="drink-title">Coca Cola</h3>
            </div>

            {/* Card 2 — Empty (burger landing zone) */}
            <div className="drink-card empty-card">
              <h3 className="drink-title">Burger</h3>
            </div>

            {/* Card 3 — Pepsi */}
            <div className="drink-card">
              <img src={latusDecor} alt="Lettuce Decor" className="drink-decor" />
              <img src={pepsi}      alt="Pepsi"         className="drink-img"   />
              <h3 className="drink-title">Pepsi</h3>
            </div>

          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <h2 className="footer-heading">Visit Us</h2>
          <div className="footer-details">
            <p><strong>Address:</strong> Tajpur Road, Ludhiana, Punjab</p>
            <p><strong>Phone:</strong> 9877932989</p>
            <p><strong>Opening Hours:</strong> Open daily: 10 AM – 11 PM</p>
          </div>
        </div>
      </footer></div>
    </>
  );
}