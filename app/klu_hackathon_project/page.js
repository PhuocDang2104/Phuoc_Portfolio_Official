'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './page.css'; // CSS riêng cho KLU page
import AppNav from '../components/AppNav';
import SiteFooter from '../components/SiteFooter';
import ScrollReveal from '../components/ScrollReveal';
import ContactForm from '../components/ContactForm';

export default function KluHackathonProjectPage() {
  useEffect(() => {
    // ===== Smooth scroll anchors =====
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 72;
          const top =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // ===== Contact form -> mailto =====
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subjInput = document.getElementById('subject');
        const msgInput = document.getElementById('message');
        const subject = encodeURIComponent(
          subjInput?.value || 'Contact from portfolio',
        );
        const body = encodeURIComponent(msgInput?.value || '');
        window.location.href = `mailto:phuoc.dang2104@gmail.com?subject=${subject}&body=${body}`;
      });
    }

    // ===== Header shrink / shadow =====
    (function headerShrink() {
      const nav = document.querySelector('nav.navbar');
      if (!nav) return;
      const basePad = 14;
      window.addEventListener(
        'scroll',
        () => {
          if (window.scrollY > 40) {
            nav.style.padding = '8px 22px';
            nav.style.boxShadow = '0 6px 20px rgba(2,6,23,0.6)';
          } else {
            nav.style.padding = `${basePad}px 22px`;
            nav.style.boxShadow = 'none';
          }
        },
        { passive: true },
      );
    })();

    // ===== Gallery lightbox =====
    (function galleryLightbox() {
      const lightbox = document.getElementById('lightbox');
      const lbImg = document.getElementById('lbImg');
      const lbClose = document.getElementById('lbClose');
      if (!lightbox || !lbImg || !lbClose) return;

      document.querySelectorAll('.gallery-thumb').forEach((img) => {
        img.addEventListener('click', () => {
          const src = img.dataset.large || img.src;
          lbImg.src = src;
          lightbox.style.display = 'flex';
          lightbox.setAttribute('aria-hidden', 'false');
        });
      });

      lbClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        lbImg.src = '';
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lbClose.click();
        }
      });
    })();

    // ===== Copy GitHub buttons (SAVINA repo – chỉnh lại nếu bạn có link riêng) =====
    (function copyGit() {
      const repoURL =
        'https://github.com/PhuocDang2104'; // TODO: đổi thành repo SAVINA khi có
      ['copyGithub', 'copyGithub2'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(repoURL)
              .then(() => {
                const orig = el.textContent;
                el.textContent = 'Copied ✓';
                setTimeout(() => {
                  el.textContent = orig;
                }, 1500);
              })
              .catch(() => window.open(repoURL, '_blank'));
          } else {
            window.open(repoURL, '_blank');
          }
        });
      });
    })();

    // ===== Stack carousel =====
    (function stackCarousel() {
      const track = document.getElementById('stackTrack');
      if (!track) return;

      const items = Array.from(track.querySelectorAll('.stack-item'));
      const prevBtn = document.getElementById('stackPrev');
      const nextBtn = document.getElementById('stackNext');
      const detailsTitle = document.getElementById('stackDetailsTitle');
      const detailsText = document.getElementById('stackDetailsText');
      const detailsImg = document.getElementById('stackDetailsImg');
      const carouselRoot = document.getElementById('stackCarousel');

      let current = 0;
      const total = items.length;
      const mod = (n, m) => ((n % m) + m) % m;

      function renderDetail(desc, raw) {
        let html = '';
        if (desc) html += `<p>${desc}</p>`;
        try {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) {
            html +=
              '<ul>' + arr.map((d) => `<li>${d}</li>`).join('') + '</ul>';
            return html;
          }
        } catch (e) {
          if (raw) html += `<p>${raw}</p>`;
        }
        return html;
      }

      function applyPositions(centerIdx) {
        items.forEach((it, i) => {
          const rel = mod(i - centerIdx, total);
          let dist = rel;
          if (rel > total / 2) dist = rel - total;
          it.classList.remove(
            'pos-left2',
            'pos-left1',
            'pos-center',
            'pos-right1',
            'pos-right2',
            'pos-hidden',
          );
          if (dist === 0) it.classList.add('pos-center');
          else if (dist === -1) it.classList.add('pos-left1');
          else if (dist === -2) it.classList.add('pos-left2');
          else if (dist === 1) it.classList.add('pos-right1');
          else if (dist === 2) it.classList.add('pos-right2');
          else it.classList.add('pos-hidden');
        });

        const centerItem = items[centerIdx];
        if (centerItem) {
          const title = centerItem.dataset.title || '';
          const desc = centerItem.dataset.desc || '';
          const detail = centerItem.dataset.detail || '';
          const image = centerItem.dataset.image || '';
          if (detailsTitle) detailsTitle.textContent = title;
          if (detailsText)
            detailsText.innerHTML = renderDetail(desc, detail);
          if (detailsImg) {
            detailsImg.src = image;
            detailsImg.alt = `${title} illustration`;
          }
        }

        items.forEach((it, i) =>
          it.setAttribute('aria-selected', String(i === centerIdx)),
        );
      }

      function goTo(index) {
        current = mod(index, total);
        applyPositions(current);
      }
      function next() {
        goTo(current + 1);
      }
      function prev() {
        goTo(current - 1);
      }

      applyPositions(current);

      items.forEach((it, idx) => {
        it.addEventListener('click', () => {
          goTo(idx);
          resetAutoRotate();
        });
      });
      if (prevBtn)
        prevBtn.addEventListener('click', () => {
          prev();
          resetAutoRotate();
        });
      if (nextBtn)
        nextBtn.addEventListener('click', () => {
          next();
          resetAutoRotate();
        });

      if (carouselRoot) {
        carouselRoot.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
            resetAutoRotate();
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
            resetAutoRotate();
          }
        });
      }

      let autoTimer = null;
      const AUTO_DELAY = 4000;
      function startAutoRotate() {
        stopAutoRotate();
        autoTimer = setInterval(() => {
          next();
        }, AUTO_DELAY);
      }
      function stopAutoRotate() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }
      function resetAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
      }

      if (carouselRoot) {
        carouselRoot.addEventListener('pointerenter', () => stopAutoRotate());
        carouselRoot.addEventListener('pointerleave', () => startAutoRotate());
        carouselRoot.addEventListener('focusin', () => stopAutoRotate());
        carouselRoot.addEventListener('focusout', () => startAutoRotate());
      }

      startAutoRotate();
    })();
  }, []);

  return (
    <>
      {/* Global ScrollReveal */}
            <ScrollReveal />

      {/* NAV (dùng component dùng chung) */}
            <AppNav />  

      {/* HERO – KLU / SAVINA */}
      <section
        className="hero project-hero reveal"
        id="home"
        aria-label="Project hero"
      >
        <div className="page hero-inner">
          <div className="hero-left reveal">
            <div className="kicker">
              HumanLog Hackathon 2025 · 2nd Runner-up · Team SAVINA
            </div>
            <h1 className="hero-title">
              SAVINA – Humanitarian Logistics AIoT System
            </h1>
            <p className="lead">
              AIoT &amp; Humanitarian Logistics system for food distribution and
              relief: ESP32-CAM with computer vision for aerial human detection,
              K-Means clustering for resource allocation, and RFID for warehouse
              inventory management.
            </p>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#technical">
                Technical details
              </a>
              <a className="btn btn-ghost" href="#data">
                Product Sketch
              </a>
              <a className="btn btn-ghost" id="copyGithub">
                Copy GitHub
              </a>
            </div>

            <div className="meta-row" aria-hidden="true">
              <div className="meta-pill">ESP32-CAM · ESP32-S3</div>
              <div className="meta-pill">ESP8266 · RFID</div>
              <div className="meta-pill">Wi-Fi · MQTT</div>
              <div className="meta-pill">Flask · PostgreSQL · Google Sheet</div>
              <div className="meta-pill">UART · SPI</div>
              <div className="meta-pill">Computer Vision · K-Means</div>
            </div>
          </div>

          <div className="hero-right reveal">
            <img
              src="/images/klu_hackathon/klu_hackathon_banner.jpg"
              alt="SAVINA banner"
              className="hero-img-full"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="page">
        {/* Overview */}
        <section
          id="overview"
          className="content reveal"
          aria-labelledby="overview-title"
        >
          <h2 className="section-title" id="overview-title">
            Project Overview
          </h2>
          <p className="muted">
            SAVINA is a humanitarian logistics initiative leveraging AI and IoT
            technologies to optimize resource distribution in Vietnam, spanning
            hardware (edge AIoT) to software, databases, and ML algorithms:
          </p>
          <ul className="muted">
            <li>
              Designed custom PCB/PCBA with ESP32-CAM for embedded edge AI
              computer vision on drones to detect people from the air.
            </li>
            <li>
              Implemented RFID, temperature-humidity sensors, and ESP32/ESP8266
              MCUs as a demo system for inbound, inventory, and outbound
              warehouse management.
            </li>
            <li>
              Developed a software stack (Flask, Redis, PostgreSQL) for citizen
              and admin access, integrating K-Means clustering to allocate
              relief supplies more effectively, with a pilot case in Ho Chi Minh
              City.
            </li>
          </ul>

          <div className="quick-grid" style={{ marginTop: '16px' }}>
            <div className="quick-card">
              <strong>Role</strong>
              <div className="muted">
                Firmware | Edge AI | Software Developer <br />
                <strong>Team SAVINA</strong>
              </div>
            </div>
            <div className="quick-card">
              <strong>Award</strong>
              <div className="muted">
                2nd Runner-up · HumanLog Hackathon 2025
              </div>
            </div>
            <div className="quick-card">
              <strong>Product Scope</strong>
              <div className="muted">Hardware → Firmware → Software</div>
            </div>
          </div>
        </section>

        {/* Certifications – layout iot-prize 3 cột */}
        <section
          id="certifications"
          className="content reveal"
          aria-labelledby="certifications-title"
        >
          <h2 className="section-title" id="certifications-title">
            Certifications
          </h2>
          <div className="iot-prize">
            <img
              src="/images/klu_hackathon/klu_cert_3.jpg"
              alt="Certification main"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_3.jpg"
            />
            <img
              src="/images/klu_hackathon/klu_cert_2.jpg"
              alt="Certification 2"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_2.jpg"
            />
            <img
              src="/images/klu_hackathon/klu_cert_1.jpg"
              alt="Certification 1"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_1.jpg"
            />
            <img
              src="/images/klu_hackathon/klu_cert_4.jpg"
              alt="Certification 4"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_4.jpg"
            />
          </div>
        </section>

        {/* System Architecture */}
        <section
          id="architecture"
          className="content reveal"
          aria-labelledby="arch-title"
        >
          <h2 className="section-title" id="arch-title">
            System Architecture
          </h2>

          <div className="arch-banner">
            <img
              src="/images/klu_hackathon/SAVINA_System.png"
              alt="System Architecture Banner"
            />
          </div>

          <div className="arch" style={{ marginTop: '12px' }}>
            <div className="box device">
              ESP32-S3 / ESP32-CAM
              <br />
              <span className="small-muted">
                RFID RC522, DHT11, Edge CV
              </span>
            </div>
            <div className="arrow">→</div>
            <div className="box gateway">
              IoT Gateway
              <br />
              <span className="small-muted">MQTT, WiFi</span>
            </div>
            <div className="arrow">→</div>
            <div className="box backend">
              Desktop ( Redis / Flask + Postgres)
              <br />
              <span className="small-muted">Database, Software</span>
            </div>
          </div>
        </section>

        {/* Stacks – vẫn dùng carousel + JS, nhưng nội dung SAVINA */}
        <section
          id="stacks"
          className="content reveal"
          aria-labelledby="stacks-title"
        >
          <h2 className="section-title" id="stacks-title">
            Product Stacks
          </h2>

          <div
            className="stack-carousel-wrap"
            aria-label="Product stacks"
          >
            <div
              className="stack-carousel"
              id="stackCarousel"
              tabIndex={0}
              aria-roledescription="carousel"
            >
              <button
                className="stack-nav stack-nav-left"
                id="stackPrev"
                aria-label="Previous stack"
              >
                ◀
              </button>

              <div className="stack-track" id="stackTrack">
                {/* 1) Edge CV */}
                <div
                  className="stack-item"
                  data-title="ESP32-CAM – Edge Computer Vision"
                  data-desc="On-board human detection from aerial images to support rescue and relief."
                  data-detail='[
                    "ESP32-CAM mounted on low-cost drone platform.",
                    "Simple CNN / classical CV pipeline for human / obstacle detection.",
                    "Events (coordinates, confidence) forwarded to backend for route planning."
                  ]'
                  data-image="/images/iot_challenge/suggestion_AI_banner.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/suggestion_AI.png"
                      alt="Edge CV icon"
                    />
                    <div className="stack-name">
                      ESP32-CAM <br /> <i>Edge CV</i>
                    </div>
                  </div>
                </div>

                {/* 2) RFID warehouse */}
                <div
                  className="stack-item"
                  data-title="ESP32 / ESP8266 – RFID Warehouse"
                  data-desc="RFID- and sensor-based inventory system for inbound, storage, and outbound."
                  data-detail='[
                    "RC522 RFID tags attached to relief goods and pallets.",
                    "DHT11/22 sensors monitor temperature/humidity of storage area.",
                    "MQTT messages for every inbound/outbound event for traceability."
                  ]'
                  data-image="/images/iot_challenge/drop_detect_AI_banner.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/drop_detect_AI.png"
                      alt="RFID icon"
                    />
                    <div className="stack-name">
                      ESP32 / 8266 <br /> <i>RFID + Env</i>
                    </div>
                  </div>
                </div>

                {/* 3) Gateway */}
                <div
                  className="stack-item"
                  data-title="IoT Gateway – MQTT Bridge"
                  data-desc="Central gateway collecting data from multiple ESP nodes and pushing to backend."
                  data-detail='[
                    "Acts as MQTT broker or bridge to cloud/server.",
                    "Aggregates alerts from drones and warehouse nodes.",
                    "Can run simple business rules to filter or forward events."
                  ]'
                  data-image="/images/iot_challenge/xg26_sensors_banner.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/xg26_sensors.png"
                      alt="Gateway icon"
                    />
                    <div className="stack-name">
                      IoT Gateway <br /> <i>MQTT Core</i>
                    </div>
                  </div>
                </div>

                {/* 4) Backend */}
                <div
                  className="stack-item"
                  data-title="Flask + PostgreSQL – Relief Platform"
                  data-desc="Backend for managing beneficiaries, inventory, and distribution plans."
                  data-detail='[
                    "Flask REST APIs for citizen registration and admin dashboard.",
                    "PostgreSQL schema for households, warehouses, shipments, and history.",
                    "Telegram / email style notifications for critical events."
                  ]'
                  data-image="/images/iot_challenge/software_banner.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/software.png"
                      alt="Backend icon"
                    />
                    <div className="stack-name">
                      Flask Backend <br /> <i>DB + APIs</i>
                    </div>
                  </div>
                </div>

                {/* 5) Analytics */}
                <div
                  className="stack-item"
                  data-title="K-Means Clustering – Humanitarian Planning"
                  data-desc="Data-driven clustering of households and locations for better allocation."
                  data-detail='[
                    "Households grouped by location, vulnerability, and demand.",
                    "Clusters serve as planning units for truck / boat routing.",
                    "Scenario comparison between naive and optimized allocation."
                  ]'
                  data-image="/images/klu_hackathon/SAVINA_System.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/rp4_mg21.png"
                      alt="Analytics icon"
                    />
                    <div className="stack-name">
                      K-Means <br /> <i>Relief analytics</i>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="stack-nav stack-nav-right"
                id="stackNext"
                aria-label="Next stack"
              >
                ▶
              </button>
            </div>

            {/* details area */}
            <div
              className="stack-details split"
              id="stackDetails"
              aria-live="polite"
            >
              <div className="stack-details-left">
                <h5 id="stackDetailsTitle">ESP32-CAM – Edge Computer Vision</h5>
                <div id="stackDetailsText" />
              </div>
              <div className="stack-details-right">
                <img
                  id="stackDetailsImg"
                  src="/images/klu_hackathon/SAVINA_System.png"
                  alt="Stack illustration"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technical flow */}
        <section
          id="technical"
          className="content reveal"
          aria-labelledby="tech-title"
        >
          <h2 className="section-title" id="tech-title">
            System Flow
          </h2>

          <div className="grid-2">
            <article className="card">
              <h3>System Flow &amp; Connectivity</h3>
              <ul>
                <li>
                  <strong>Sensor Layer → Edge MCU</strong>:
                  <ul>
                    <li>
                      RFID + DHT11/22 → ESP32 / ESP8266 via SPI / GPIO for
                      warehouse tracking.
                    </li>
                    <li>
                      Camera module → ESP32-CAM for onboard computer vision.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Edge AI Processing</strong>:
                  <ul>
                    <li>Human detection and event filtering on ESP32-CAM.</li>
                    <li>
                      Local logic for tag scanning, temperature alerts, and
                      stock updates.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Connectivity Backbone</strong>:
                  <ul>
                    <li>Wi-Fi + MQTT to push events to the gateway/backend.</li>
                  </ul>
                </li>
                <li>
                  <strong>Backend &amp; Optimization</strong>:
                  <ul>
                    <li>
                      Flask server receives household data and warehouse
                      inventory.
                    </li>
                    <li>
                      K-Means clustering groups households by location and
                      priority to propose optimized delivery routes.
                    </li>
                  </ul>
                </li>
              </ul>
            </article>

            <article className="card">
              <img
                className="gallery-thumb"
                src="/images/klu_hackathon/klu_hackathon_banner.jpg"
                alt="System overview"
                data-large="/images/klu_hackathon/klu_hackathon_banner.jpg"
              />
            </article>
          </div>
        </section>

        {/* Data / BOM */}
        <section
          id="data"
          className="content reveal"
          aria-labelledby="data-title"
        >
          <h2 className="section-title" id="data-title">
            SAVINA Demo BOM
          </h2>

          <div className="grid-2">
            <article className="card">
              <img
                className="gallery-thumb"
                src="/images/klu_hackathon/SAVINA_System.png"
                alt="BOM diagram"
                data-large="/images/klu_hackathon/SAVINA_System.png"
              />
            </article>

            <article className="card">
              <h3>Smart Relief Summary</h3>
              <ul>
                <li>
                  <strong>MCU/Embedded:</strong> ESP32-CAM, ESP32-S3, ESP8266
                </li>
                <li>
                  <strong>Sensors:</strong> RFID RC522, DHT11/22, camera module
                </li>
                <li>
                  <strong>Connectivity:</strong> Wi-Fi, MQTT
                </li>
                <li>
                  <strong>Backend:</strong> Flask, PostgreSQL, Google Sheets
                </li>
                <li>
                  <strong>ML:</strong> K-Means clustering for allocation
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Gallery */}
        <section
          id="gallery"
          className="content reveal"
          aria-labelledby="gallery-title"
        >
          <h2 className="section-title" id="gallery-title">
            Gallery &amp; Artifacts
          </h2>
          <div className="gallery-grid">
            <img
              src="/images/klu_hackathon/klu_cert_1.jpg"
              alt="Gallery 1"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_1.jpg"
            />
            <img
              src="/images/klu_hackathon/klu_cert_2.jpg"
              alt="Gallery 2"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_2.jpg"
            />
            <img
              src="/images/klu_hackathon/klu_cert_3.jpg"
              alt="Gallery 3"
              className="gallery-thumb"
              data-large="/images/klu_hackathon/klu_cert_3.jpg"
            />
          </div>
        </section>

        {/* Downloads */}
        <section
          id="downloads"
          className="content reveal"
          aria-labelledby="downloads-title"
        >
          <h2 className="section-title" id="downloads-title">
            Downloads &amp; Links
          </h2>
          <div className="download-row">
            <a
              className="btn btn-case-study"
              href="/images/iot_challenge/Edgelectronix.pptx"
              download
            >
              Download Presentation Slides ( PPTX )
            </a>
            <a className="btn btn-ghost" id="copyGithub2" href="#">
              Copy GitHub URL
            </a>
          </div>
        </section>

        {/* CONTACT (component dùng chung) */}
        <ContactForm />

        {/* FOOTER (component dùng chung, auto year) */}
              <SiteFooter />
      </div>

      {/* Lightbox */}
      <div id="lightbox" className="lightbox" aria-hidden="true">
        <div className="lightbox-inner">
          <button id="lbClose" className="lb-close" aria-label="Close">
            ✕
          </button>
          <img id="lbImg" alt="Preview" />
        </div>
      </div>
    </>
  );
}
