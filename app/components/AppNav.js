'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

function scrollToHash(hash) {
  if (!hash || !hash.startsWith('#')) return;
  const id = hash.slice(1);
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 72;
  const top =
    el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function AppNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Header shrink / shadow on scroll
  useEffect(() => {
    const nav = document.querySelector('nav.navbar');
    if (!nav) return;

    const basePad = 14;

    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.style.padding = '8px 22px';
        nav.style.boxShadow = '0 6px 20px rgba(2,6,23,0.6)';
      } else {
        nav.style.padding = `${basePad}px 22px`;
        nav.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Auto close mobile menu khi resize > 720
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToHash(href);
      closeMobile();
    }
  };

  return (
    <div className="nav-wrap">
      <div className="page">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          {/* Left: avatar + brand */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link
              href="/"
              className="nav-brand-link"
              aria-label="Go to home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
              }}
              onClick={closeMobile}
            >
              <img
                src="/images/Phuoc_avatar.png"
                alt="Phước Đặng avatar"
                className="nav-avatar"
              />
              <div className="brand">
                Đặng Như Phước{' '}
                <small>Embedded &amp; Edge AI Engineer</small>
              </div>
            </Link>
          </div>

          {/* Right: links + CV + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="nav-links" id="nav-links">
              <Link href="/" onClick={closeMobile}>
                Home
              </Link>

              <a
                href="#overview"
                onClick={(e) => handleAnchorClick(e, '#overview')}
              >
                About
              </a>

              {/* === Projects dropdown với group === */}
              <div className="dropdown">
                <a
                  href="#projects"
                  onClick={(e) => handleAnchorClick(e, '#projects')}
                >
                  Projects ▾
                </a>
                <div className="dropdown-content">
                  {/* Group 1: Hackathons & Competitions */}
                  <div className="dropdown-section">
                    <div className="dropdown-heading">
                      Hackathons &amp; Competitions
                    </div>
                    <ul>
                      <li>
                        <Link href="/iot_challenge_product" onClick={closeMobile}>
                          SCENT – Smart Customer Experience
                        </Link>
                      </li>
                      <li>
                        {/* chỉnh lại href này theo route DENSO của bạn */}
                        <Link href="/denso_demand_forecaster" onClick={closeMobile}>
                          DENSO – Demand Forecaster Software
                        </Link>
                      </li>
                      <li>
                        <Link href="/klu_hackathon_project" onClick={closeMobile}>
                          ESP32Cam RFID AIoT in Warehouse
                        </Link>
                      </li>
                      <li>
                        <Link href="/ai_intel_global" onClick={closeMobile}>
                          AIMING – Agricultural AIoT
                        </Link>
                      </li>
                      <li>
                        <Link href="/yuvai_global_challenge" onClick={closeMobile}>
                          MedMind – YUVAi Challenge
                        </Link>
                      </li>
                      <li>
                        <Link href="/rmit_hackathon_project" onClick={closeMobile}>
                          RMIT Hackathon
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Group 2: Research */}
                  <div className="dropdown-section">
                    <div className="dropdown-heading">Research</div>
                    <ul>
                      <li>
                        {/* chỉnh lại href này theo route trang research của bạn */}
                        <Link href="/automotive_control" onClick={closeMobile}>
                          Automotive Control & Intelligent Driving Research
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a
                href="#timeline"
                onClick={(e) => handleAnchorClick(e, '#timeline')}
              >
                Certifications
              </a>
              <a
                href="#skills"
                onClick={(e) => handleAnchorClick(e, '#skills')}
              >
                Skills
              </a>
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
              >
                Contact
              </a>
            </div>

            <a
              className="cta-download"
              href="/Dang-Nhu-Phuoc_AI_CV.pdf"
              download
              onClick={closeMobile}
            >
              Download CV
            </a>

            <button
              className="hamburger"
              aria-label="Menu"
              aria-expanded={mobileOpen ? 'true' : 'false'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="hamb-line" />
              <span className="hamb-line" />
              <span className="hamb-line" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobileMenu"
        className="mobile-menu"
        aria-hidden={mobileOpen ? 'false' : 'true'}
        style={{
          display: mobileOpen ? 'block' : 'none',
        }}
      >
        <a
          href="#home"
          onClick={(e) => handleAnchorClick(e, '#home')}
        >
          Home
        </a>
        <a
          href="#overview"
          onClick={(e) => handleAnchorClick(e, '#overview')}
        >
          About
        </a>
        <a
          href="#projects"
          onClick={(e) => handleAnchorClick(e, '#projects')}
        >
          Projects
        </a>
        <a
          href="#timeline"
          onClick={(e) => handleAnchorClick(e, '#timeline')}
        >
          Experience
        </a>
        <a
          href="#skills"
          onClick={(e) => handleAnchorClick(e, '#skills')}
        >
          Skills
        </a>
        <a
          href="#contact"
          onClick={(e) => handleAnchorClick(e, '#contact')}
        >
          Contact
        </a>
      </div>
    </div>
  );
}
