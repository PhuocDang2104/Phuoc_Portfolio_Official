'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './page.css';
import AppNav from '../components/AppNav';
import SiteFooter from '../components/SiteFooter';
import ScrollReveal from '../components/ScrollReveal';
import ContactForm from '../components/ContactForm';

export default function DensoDemandForecasterPage() {
  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    // Contact form → mailto
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(document.getElementById('subject')?.value ?? '');
        const message = encodeURIComponent(document.getElementById('message')?.value ?? '');
        window.location.href = `mailto:phuoc.dang2104@gmail.com?subject=${subject}&body=${message}`;
      });
    }

    // Header shrink
    (function () {
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
      onScroll();
    })();

    // Lightbox
    (function lightbox() {
      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lbImg');
      const lbClose = document.getElementById('lbClose');
      if (!lb || !lbImg || !lbClose) return;

      document.querySelectorAll('.gallery-thumb').forEach((img) => {
        img.addEventListener('click', () => {
          lbImg.src = img.dataset.large || img.src;
          lb.style.display = 'flex';
          lb.setAttribute('aria-hidden', 'false');
        });
      });

      lbClose.addEventListener('click', () => {
        lb.style.display = 'none';
        lbImg.src = '';
      });

      lb.addEventListener('click', (e) => {
        if (e.target === lb) lbClose.click();
      });
    })();

    // Stacks carousel
    (function carousel() {
      const track = document.getElementById('stackTrack');
      if (!track) return;

      const items = Array.from(track.querySelectorAll('.stack-item'));
      const prevBtn = document.getElementById('stackPrev');
      const nextBtn = document.getElementById('stackNext');
      const dTitle = document.getElementById('stackDetailsTitle');
      const dText = document.getElementById('stackDetailsText');
      const dImg = document.getElementById('stackDetailsImg');
      let current = 0;
      const total = items.length;
      const mod = (n, m) => ((n % m) + m) % m;

      function renderDetail(desc, raw) {
        let html = '';
        if (desc) html += `<p>${desc}</p>`;
        try {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) {
            html += `<ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
          }
        } catch {
          if (raw) html += `<p>${raw}</p>`;
        }
        return html;
      }

      function apply(centerIdx) {
        items.forEach((it, i) => {
          const rel = mod(i - centerIdx, total);
          let dist = rel > total/2 ? rel - total : rel;
          it.className = 'stack-item'; 
          if (dist === 0) it.classList.add('pos-center');
          else if (dist === -1) it.classList.add('pos-left1');
          else if (dist === -2) it.classList.add('pos-left2');
          else if (dist === 1) it.classList.add('pos-right1');
          else if (dist === 2) it.classList.add('pos-right2');
          else it.classList.add('pos-hidden');
        });

        const c = items[centerIdx];
        if (c) {
          dTitle.textContent = c.dataset.title || '';
          dText.innerHTML = renderDetail(c.dataset.desc, c.dataset.detail);
          dImg.src = c.dataset.image || '';
          dImg.alt = c.dataset.title || '';
        }
      }

      function goTo(i) {
        current = mod(i, total);
        apply(current);
      }

      prevBtn?.addEventListener('click', () => goTo(current - 1));
      nextBtn?.addEventListener('click', () => goTo(current + 1));
      items.forEach((it, idx) => it.addEventListener('click', () => goTo(idx)));
      goTo(0);
    })();
  }, []);

  return (
    <>
      <ScrollReveal />
      <AppNav />

      {/* ============ HERO ============ */}
      <section className="hero project-hero reveal" id="home">
        <div className="page hero-inner">
          <div className="hero-left reveal">
            <div className="kicker">DENSO Factory Hacks 2025 · AI-Powered Predictive Brain</div>
            <h1 className="hero-title">DENSO Supply & Demand Forecaster</h1>
            <p className="lead">
              An end-to-end predictive platform forecasting supply shocks, demand volatility,
              and portfolio dynamics using public data, ML forecasting, RAG intelligence, and 
              multi-level dashboards.
            </p>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#overview">Overview</a>
              <a className="btn btn-ghost" href="#architecture">Architecture</a>
              <a className="btn btn-ghost" href="#stacks">Tech Stacks</a>
            </div>

            <div className="meta-row">
              <div className="meta-pill">Prophet</div>
              <div className="meta-pill">XGBoost</div>
              <div className="meta-pill">FastAPI</div>
              <div className="meta-pill">Streamlit</div>
              <div className="meta-pill">PostgreSQL</div>
              <div className="meta-pill">LangChain RAG</div>
            </div>
          </div>

          <div className="hero-right reveal">
            <img
              src="/images/denso_demand_forecaster/denso_forecast_banner.png"
              alt="DENSO Forecaster Hero"
              className="hero-img-full"
            />
          </div>
        </div>
      </section>

      {/* ============ MAIN CONTENT ============ */}
      <div className="page">

        {/* OVERVIEW */}
        <section className="content reveal" id="overview">
          <h2 className="section-title">Executive Summary</h2>
          <p className="muted">
            The End-to-End Supply & Demand Forecaster is a predictive intelligence platform that 
            transforms public data into actionable insights for DENSO’s global operations. It shifts 
            planning from reactive to predictive—reducing disruption costs, optimizing inventory, and 
            guiding product portfolio strategy.
          </p>
        </section>

        {/* PROBLEM STATEMENT */}
        <section className="content reveal" id="problem">
          <h2 className="section-title">The Current Landscape</h2>

          <ul className="muted big-list">
            <li><strong>Supply Chain Volatility:</strong> Natural disasters, geopolitics, and currency shocks disrupt materials & semiconductors.</li>
            <li><strong>Fragmented Market Demand:</strong> Legacy parts decline while EV components surge, requiring precise forecasting.</li>
            <li><strong>Siloed Planning:</strong> Product teams work in isolation without a unified risk picture.</li>
            <li><strong>Legacy System Limitations:</strong> ERPs are systems of record, not systems of prediction.</li>
          </ul>
        </section>

        {/* ARCHITECTURE */}
        <section className="content reveal" id="architecture">
          <h2 className="section-title">Solution Architecture</h2>

          <img
            src="/images/denso_demand_forecaster/denso_system_architecture.png"
            alt="Architecture"
            className="arch-banner"
          />

          <div className="arch">
            <div className="box device">
              Data Ingestion<br /><span className="small-muted">5+ Public World APIs</span>
            </div>
            <div className="arrow">→</div>

            <div className="box gateway">
              ML/DL Engine<br /><span className="small-muted">Prophet · GPT API</span>
            </div>
            <div className="arrow">→</div>

            <div className="box backend">
              AI Agent<br /><span className="small-muted">LangChain + Chroma</span>
            </div>
            <div className="arrow">→</div>

            <div className="box backend">
              Database<br /><span className="small-muted">Postgres + TimescaleDB</span>
            </div>
            <div className="arrow">→</div>

            <div className="box ai">
              Dashboard UI<br /><span className="small-muted">Chart.js + Streamlit</span>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section className="content reveal" id="roadmap">
          <h2 className="section-title">MVP Roadmap</h2>
          <ul className="muted big-list">
            <li><strong>Step 1:</strong> Multi-source data ingestion (weather, seismic, FX, macro, automotive production).</li>
            <li><strong>Step 2:</strong> Forecasting modules for supply risk & product demand.</li>
            <li><strong>Step 3:</strong> AI Agent (RAG) for automated recommendations.</li>
            <li><strong>Step 4:</strong> Multi-level dashboards for executives & planners.</li>
            <li><strong>Step 5:</strong> Monte Carlo production risk simulation.</li>
          </ul>
        </section>

        {/* STACKS CAROUSEL */}
        <section className="content reveal" id="stacks">
          <h2 className="section-title">Tech Stacks</h2>

          <div className="stack-carousel-wrap">
            <div className="stack-carousel" id="stackCarousel">
              <button className="stack-nav stack-nav-left" id="stackPrev">◀</button>

              <div className="stack-track" id="stackTrack">

                {/* 1 — Data Ingestion */}
                <div className="stack-item"
                  data-title="Public Data Ingestion Layer"
                  data-desc="Automated collection pipeline for 5+ external APIs."
                  data-detail='[
                    "Weather & Natural Disaster Data (OpenWeather, USGS)",
                    "FX & Macro Indicators (ExchangeRate API, IMF, World Bank)",
                    "Logistics pricing and political news",
                    "Automated schedulers via cron-style Python scripts"
                  ]'
                  data-image="/images/denso_demand_forecaster/13.png"
                >
                  <div className="stack-card">
                    <div className="stack-icon-svg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20"/>
                        <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <div className="stack-name">Ingestion</div>
                  </div>
                </div>

                {/* 2 — ML Engine */}
                <div className="stack-item"
                  data-title="Forecasting Engine"
                  data-desc="Hybrid ML suite for supply risk & product demand."
                  data-detail='[
                    "Prophet for stable, seasonal series",
                    "XGBoost & RF for noisy, high-volatility markets",
                    "Feature engineering + external regressors",
                    "Daily retraining windows"
                  ]'
                  data-image="/images/denso_demand_forecaster/14.png"
                >
                  <div className="stack-card">
                    <div className="stack-icon-svg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="4" cy="12" r="2"/>
                        <circle cx="12" cy="4" r="2"/>
                        <circle cx="12" cy="20" r="2"/>
                        <circle cx="20" cy="12" r="2"/>
                        <path d="M6 12h6M14 12h6M12 6v12"/>
                      </svg>
                    </div>
                    <div className="stack-name">ML Engine</div>
                  </div>
                </div>

                {/* 3 — AI Agent */}
                <div className="stack-item"
                  data-title="AI Agent (RAG Intelligence)"
                  data-desc="Agentic layer for automated recommendations."
                  data-detail='[
                    "Chroma vector DB",
                    "LLM-based reasoning via LangChain",
                    "Triggered alerts on high-risk thresholds",
                    "Simulated playbooks for supply-disaster scenarios"
                  ]'
                  data-image="/images/denso_demand_forecaster/15.png"
                >
                  <div className="stack-card">
                    <div className="stack-icon-svg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="7" width="18" height="10" rx="2" />
                        <path d="M12 3v4" />
                        <circle cx="8" cy="12" r="1" />
                        <circle cx="16" cy="12" r="1" />
                        <path d="M9 16h6" />
                      </svg>
                    </div>
                    <div className="stack-name">AI Agent</div>
                  </div>
                </div>

                {/* 4 — Backend */}
                <div className="stack-item"
                  data-title="Backend Infrastructure"
                  data-desc="APIs, SQL orchestration, caching & ETL."
                  data-detail='[
                    "FastAPI/Flask hybrid backend",
                    "PostgreSQL schema + constraints",
                    "ETL-ready feature marts",
                    "Transaction-safe SQL executors"
                  ]'
                  data-image="/images/denso_demand_forecaster/16.png"
                >
                  <div className="stack-card">
                    <div className="stack-icon-svg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
                        <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
                      </svg>
                    </div>
                    <div className="stack-name">Backend</div>
                  </div>
                </div>

                {/* 5 — Dashboard */}
                <div className="stack-item"
                  data-title="Dashboard & Visualization"
                  data-desc="Interactive analytics for DENSO planners."
                  data-detail='[
                    "Chart.js forecasts",
                    "Streamlit diagnostic console",
                    "Real-time risk alerts",
                    "Cross-product portfolio comparison"
                  ]'
                  data-image="/images/denso_demand_forecaster/17.png"
                >
                  <div className="stack-card">
                    <div className="stack-icon-svg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18"/>
                        <rect x="7" y="10" width="2" height="7" />
                        <rect x="11" y="7" width="2" height="10" />
                        <rect x="15" y="13" width="2" height="4" />
                      </svg>
                    </div>
                    <div className="stack-name">Dashboard</div>
                  </div>
                </div>

              </div>

              <button className="stack-nav stack-nav-right" id="stackNext">▶</button>
            </div>

            {/* details */}
            <div className="stack-details split" id="stackDetails">
              <div className="stack-details-left">
                <h5 id="stackDetailsTitle">Public Data Ingestion</h5>
                <div id="stackDetailsText"></div>
              </div>
              <div className="stack-details-right">
                <img id="stackDetailsImg" src="/images/denso_demand_forecaster/stack_ingestion.png" alt="" />
              </div>
            </div>
          </div>
        </section>


        {/* MY ROLE */}
        <section className="content reveal" id="role">
          <h2 className="section-title">My Role & Contributions</h2>

          <ul className="muted big-list">
            <li>Designed full data architecture (dim/fact/feature/mart) with PostgreSQL schemas, constraints, and migrations.</li>
            <li>Built Python schedulers ingesting multi-source public data into curated ETL pipelines.</li>
            <li>Developed high-performance SQL execution layer with parameter binding + transactional control.</li>
            <li>Architected a Next.js frontend integrated with Flask/FastAPI services for real-time analytics.</li>
            <li>Implemented Chart.js dashboards & Streamlit diagnostic console.</li>
            <li>Containerized PostgreSQL with schema/seed runners and maintained KPI marts for 10 DENSO SKUs.</li>
          </ul>
        </section>

        {/* GALLERY */}
        <section className="content reveal" id="gallery">
          <h2 className="section-title">Software UI / UX</h2>
          <div className="gallery-grid">
            <img src="/images/denso_demand_forecaster/denso_ag1.png" className="gallery-thumb" />
            <img src="/images/denso_demand_forecaster/denso_ag2.jpg" className="gallery-thumb" />
            <img src="/images/denso_demand_forecaster/denso_ag3.jpg" className="gallery-thumb" />
          </div>
          <div className="gallery-grid">
            <img src="/images/denso_demand_forecaster/denso_ag4.jpg" className="gallery-thumb" />
            <img src="/images/denso_demand_forecaster/denso_ag5.jpg" className="gallery-thumb" />
            <img src="/images/denso_demand_forecaster/denso_ag6.jpg" className="gallery-thumb" />
          </div>
        </section>

        {/* DOWNLOADS */}
        <section className="content reveal" id="downloads">
          <h2 className="section-title">Downloads & Files</h2>
          <div className="download-row">
            <a className="btn btn-case-study" href="/images/denso_demand_forecaster/Denso_Presentation.pdf" download>
              Download PDF Slides
            </a>
            <a className="btn btn-ghost" href="/images/denso_demand_forecaster/architecture_full.png" download>
              Download Architecture Image
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <ContactForm />

        {/* FOOTER */}
        <SiteFooter />
      </div>

      {/* LIGHTBOX */}
      <div id="lightbox" className="lightbox" aria-hidden="true">
        <div className="lightbox-inner">
          <button id="lbClose" className="lb-close">✕</button>
          <img id="lbImg" alt="Preview" />
        </div>
      </div>
    </>
  );
}
