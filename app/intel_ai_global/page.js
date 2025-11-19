'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AppNav from '../components/AppNav';
import SiteFooter from '../components/SiteFooter';
import ScrollReveal from '../components/ScrollReveal';
import ContactForm from '../components/ContactForm';
import './page.css'; // optional – nếu bạn muốn CSS riêng

export default function IntelAIGlobalPage() {
  useEffect(() => {
    // ===== Smooth scroll for in-page anchors =====
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 72;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // ===== Lightbox simple =====
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');

    if (lightbox && lbImg && lbClose) {
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
        if (e.target === lightbox) lbClose.click();
      });
    }
  }, []);

  return (
    <>
      {/* Global ScrollReveal */}
      <ScrollReveal />

      {/* NAV */}
      <AppNav />

      {/* HERO */}
      <section className="hero project-hero reveal" id="home" aria-label="Project hero">
        <div className="page hero-inner">
          <div className="hero-left reveal">
            <div className="kicker">Intel® AI Global Impact 2025</div>
            <h1 className="hero-title">
              AIMING — AIoT Infravision for Agricultural Quality
            </h1>
            <p className="lead">
              AIoT system integrating Intel® industrial PCs, OpenVINO™ AI acceleration,
              NIR sensing, and real-time MQTT dashboards for fruit monitoring,
              inspection, and quality grading.
            </p>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#overview">
                Overview
              </a>
              <a className="btn btn-ghost" href="#system">
                System Flow
              </a>
              <a className="btn btn-ghost" href="#gallery">
                Gallery
              </a>
            </div>

            <div className="meta-row" aria-hidden="true">
              <div className="meta-pill">Intel® CPU/GPU</div>
              <div className="meta-pill">OpenVINO™</div>
              <div className="meta-pill">MQTT · Redis</div>
              <div className="meta-pill">ESP32</div>
              <div className="meta-pill">NIR (GY-7263)</div>
            </div>
          </div>

          <div className="hero-right reveal">
            <img
              src="/images/intel_ai_global/intel_ai_global_banner.png"
              alt="Intel AI Banner"
              className="hero-img-full"
            />
          </div>
        </div>
      </section>

      <div className="page">
        {/* ===== OVERVIEW ===== */}
        <section id="overview" className="content reveal" aria-labelledby="ov-title">
          <h2 className="section-title" id="ov-title">
            Project Overview
          </h2>
          <p className="muted">
            AIMING is an AIoT system designed to improve agricultural grading using a
            combined Vision AI + NIR sensing pipeline. The system runs on Intel®
            industrial PCs with OpenVINO™ acceleration, achieving up to 3× inference
            speedups compared to unoptimized ONNX/Keras models.
          </p>

          <ul className="muted" style={{ marginTop: '18px' }}>
            <li>
              <strong>AI Acceleration:</strong> Converted Keras & ONNX models to OpenVINO
              IR (.bin/.xml), optimized for Intel hardware.
            </li>
            <li>
              <strong>NIR Sensor (6 wavelengths):</strong> Custom ESP32 I²C driver for
              GY-7263 producing 6-dim spectral vectors → MQ sensors → MQTT pipeline.
            </li>
            <li>
              <strong>Gateway / Backend:</strong> Real-time grading dashboard built with
              MQTT + Redis + Python backend.
            </li>
          </ul>
        </section>

        {/* ===== SYSTEM FLOW ===== */}
        <section id="system" className="content reveal" aria-labelledby="sys-title">
          <h2 className="section-title" id="sys-title">
            System Flow & Data Pipeline
          </h2>

          <div className="grid-2">
            <article className="card">
              <h3>Hardware & Data Path</h3>
              <ul>
                <li>
                  <strong>NIR Sensor (GY-7263)</strong> → ESP32 via I²C (6D vector)
                </li>
                <li>
                  <strong>ESP32 MQTT Publisher</strong> → Desktop Gateway
                </li>
                <li>
                  <strong>Intel® Industrial PC</strong> runs:
                  <ul>
                    <li>OpenVINO™ IR inference</li>
                    <li>Vision AI + NIR fusion</li>
                    <li>Redis pub/sub for dashboard</li>
                  </ul>
                </li>
                <li>
                  <strong>Frontend Dashboard</strong> → Real-time grading visualization
                </li>
              </ul>
            </article>

            <article className="card">
              <img
                className="gallery-thumb"
                src="/images/intel_ai_banner.png"
                alt="System Summary"
                data-large="/images/intel_ai_banner.png"
              />
            </article>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section id="gallery" className="content reveal" aria-labelledby="gal-title">
          <h2 className="section-title" id="gal-title">
            Gallery & Artifacts
          </h2>

          <div className="gallery-grid">
            <img
              className="gallery-thumb"
              src="/images/intel_ai_global/intel_ai_1.png"
              data-large="/images/intel_ai_global/intel_ai_1.png"
              alt="Intel AI Work 1"
            />
            <img
              className="gallery-thumb"
              src="/images/intel_ai_global/intel_ai_2.png"
              data-large="/images/intel_ai_global/intel_ai_2.png"
              alt="Intel AI Work 2"
            />
            <img
              className="gallery-thumb"
              src="/images/intel_ai_global/intel_ai_3.png"
              data-large="/images/intel_ai_global/intel_ai_3.png"
              alt="Intel AI Work 3"
            />
          </div>
        </section>

        {/* CONTACT FORM (reusable) */}
        <ContactForm />

        {/* FOOTER */}
        <SiteFooter />
      </div>

      {/* Lightbox */}
      <div id="lightbox" className="lightbox" aria-hidden="true">
        <div className="lightbox-inner">
          <button id="lbClose" className="lb-close" aria-label="Close">✕</button>
          <img id="lbImg" alt="Preview" />
        </div>
      </div>
    </>
  );
}
