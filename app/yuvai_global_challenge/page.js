'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './page.css';
import AppNav from '../components/AppNav';
import SiteFooter from '../components/SiteFooter';
import ScrollReveal from '../components/ScrollReveal';
import ContactForm from '../components/ContactForm';

export default function YuvaiGlobalChallengePage() {
  useEffect(() => {
    // Smooth scroll for anchors in this page
    const handler = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
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
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', handler);
    });

    // Stack carousel
    (function stackCarousel() {
      const track = document.getElementById('stackTrackYuv');
      if (!track) return;
      const items = Array.from(track.querySelectorAll('.stack-item'));
      const prevBtn = document.getElementById('stackPrevYuv');
      const nextBtn = document.getElementById('stackNextYuv');
      const detailsTitle = document.getElementById('stackDetailsTitleYuv');
      const detailsText = document.getElementById('stackDetailsTextYuv');
      const detailsImg = document.getElementById('stackDetailsImgYuv');
      const carouselRoot = document.getElementById('stackCarouselYuv');

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
        it.addEventListener('click', () => goTo(idx));
      });
      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);
    })();

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <>
      <ScrollReveal />
      <AppNav />

      {/* HERO */}
      <section className="hero project-hero reveal" id="home" aria-label="Project hero">
        <div className="page hero-inner">
          <div className="hero-left reveal">
            <div className="kicker">
              YUVAi Global Youth Challenge · Ongoing
            </div>
            <h1 className="hero-title">
              MedMind — AI-First Smart Medicine Box &amp; Multi-Layer LLM System
            </h1>
            <p className="lead">
              Smart medicine box + AI gateway + LLM orchestration: edge ASR/CV on Raspberry Pi,
              FastAPI + PostgreSQL/pgvector backend, and LangGraph-powered RAG + tool-calling
              to keep families and doctors synced in real time.
            </p>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#overview">Project overview</a>
              <a className="btn btn-ghost" href="#proposal">Proposal demo</a>
              <a className="btn btn-ghost" href="#stacks">AI stack</a>
            </div>

            <div className="meta-row" aria-hidden="true">
              <div className="meta-pill">Raspberry Pi 4/5</div>
              <div className="meta-pill">FastAPI · PostgreSQL · Redis</div>
              <div className="meta-pill">pgvector · RAG · Tool-calling</div>
              <div className="meta-pill">LangChain / LangGraph</div>
              <div className="meta-pill">Tiny ASR · Edge CV</div>
              <div className="meta-pill">HTTPS / REST APIs</div>
            </div>
          </div>

          <div className="hero-right reveal">
            <img
              src="/images/yuvai_global_challenge/yuvai-banner.png"
              alt="MedMind banner"
              className="hero-img-full"
            />
          </div>
        </div>
      </section>

      <div className="page">
        {/* Overview */}
        <section id="overview" className="content reveal" aria-labelledby="overview-title">
          <h2 className="section-title" id="overview-title">Project Overview</h2>
          <p className="muted">
            MedMind is an AI-first medication adherence system: a smart medicine box with edge
            wake-word/ASR/CV, secure REST syncing, and server-side LLM orchestration for
            patient, caregiver, and doctor experiences. Designed for low-latency alerts,
            privacy-preserving on-device AI, and long-term analytics.
          </p>

          <div className="quick-grid" style={{ marginTop: '16px' }}>
            <div className="quick-card">
              <strong>Role</strong>
              <div className="muted">System design · AI orchestration · Backend</div>
            </div>
            <div className="quick-card">
              <strong>Status</strong>
              <div className="muted">Ongoing — YUVAi Global Youth Challenge</div>
            </div>
            <div className="quick-card">
              <strong>Scope</strong>
              <div className="muted">Edge device → APIs → AI gateway → LLM-core</div>
            </div>
          </div>
        </section>

        {/* Proposal */}
        <section id="proposal" className="content reveal" aria-labelledby="proposal-title">
          <h2 className="section-title" id="proposal-title">Project Proposal</h2>
          <p className="muted">
            End-to-end proposal demo: smart box interaction, AI routing, and caregiver/doctor views.
          </p>
          <div className="proposal-video">
            <video
              src="/MedMind_YUVAi_Proposal_Demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.setAttribute('controls', 'controls')}
              onMouseLeave={(e) => e.currentTarget.removeAttribute('controls')}
            />
          </div>
          <p className="muted small">Hover to reveal controls; video loops by default.</p>
        </section>

        {/* Architecture */}
        <section id="architecture" className="content reveal" aria-labelledby="arch-title">
          <h2 className="section-title" id="arch-title">Three-Layer AI Orchestration Architecture</h2>
          <div className="arch-banner">
            <img
              src="/images/yuvai_global_challenge/yuvai_AI_diagram.png"
              alt="Three-layer AI orchestration diagram"
              style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}
            />
          </div>
          <div className="arch-steps">
            <div className="arch-row">
              <div className="arch-card">
                <h4>Edge Device Layer — Smart Medicine Box</h4>
                <p>
                  Raspberry Pi 4/5 with servo-locked slots, RGB/buzzer reminders, buttons,
                  camera, and I²S mic. Runs Tiny ASR and lightweight CV to detect pill pickup
                  and capture voice locally before syncing via HTTPS REST.
                </p>
              </div>
              <div className="arch-card">
                <h4>Communication Layer — HTTPS / REST</h4>
                <p>
                  Secure APIs for schedule sync, event logging (REMINDER, BOX_OPENED,
                  DOSE_CONFIRMED, MISSED_DOSE), batch reconnect sync, and voice upload for
                  ASR + LLM processing.
                </p>
              </div>
            </div>
            <div className="arch-row">
              <div className="arch-card">
                <h4>Backend &amp; AI Layer</h4>
                <p>
                  FastAPI + PostgreSQL/pgvector + Redis Streams. Device service, medication
                  plans, event/logging, notification triggers, and multi-layer AI:
                  AI Gateway/Classifier, real-time LLM-Core with RAG + tool-calling, and
                  offline LLM-Analytics batch insights.
                </p>
              </div>
              <div className="arch-card">
                <h4>Client Layer</h4>
                <p>
                  Family app/portal and doctor dashboard for schedules, adherence,
                  symptom logs, alerts, weekly summaries, and population insights.
                </p>
              </div>
            </div>
          </div>

          <div className="arch-banner" style={{ marginTop: '16px' }}>
            <img
              src="/images/yuvai_global_challenge/yuvai-banner.png"
              alt="MedMind banner"
              style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}
            />
          </div>
        </section>

        {/* Stacks carousel */}
        <section id="stacks" className="content reveal" aria-labelledby="stacks-title">
          <h2 className="section-title" id="stacks-title">
            AI Orchestration Architecture Stack
          </h2>

          <div
            className="stack-carousel-wrap yuvai"
            aria-label="AI Orchestration stacks"
          >
            <div
              className="stack-carousel"
              id="stackCarouselYuv"
              tabIndex={0}
              aria-roledescription="carousel"
            >
              <button
                className="stack-nav stack-nav-left"
                id="stackPrevYuv"
                aria-label="Previous stack"
              >
                ◀
              </button>

              <div className="stack-track" id="stackTrackYuv">
                <div
                  className="stack-item"
                  data-title="Edge Device Layer"
                  data-desc="Smart medicine box with on-device AI and reliable event capture."
                  data-detail='[
                    "Raspberry Pi 4/5 (Linux, Python, Docker) with servo-locked pill slots, RGB/buzzer reminders, buttons, camera, and I²S mic.",
                    "Tiny ASR (Vosk/Whisper-Tiny) and lightweight CV (MobileNet/YOLO-Nano) to detect wake-word, pill pickup, and box state.",
                    "Local SQLite for buffering; REST HTTPS sync to MedMind Cloud with schedule pulls and event pushes."
                  ]'
                  data-image="/images/yuvai_global_challenge/yuvai_AI_diagram.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/rp4_mg21.png"
                      alt="Edge device icon"
                    />
                    <div className="stack-name">
                      Edge Device <br /> <i>Smart Medicine Box</i>
                    </div>
                  </div>
                </div>

                <div
                  className="stack-item"
                  data-title="Layer 1–2 — AI Gateway + Real-time LLM-Core"
                  data-desc="Classifier router plus LangGraph orchestration for RAG + tool-calling in real time."
                  data-detail='[
                    "FastAPI gateway with CPU classifiers (BERT / sentence-transformer + XGBoost) for intent + emergency scoring; applies policy guard (rate-limit, safety, PII masking) and routes.",
                    "LangChain/LangGraph orchestration with RAG retriever on pgvector and tool-calling to PostgreSQL/TimescaleDB services.",
                    "Modes: patient_chat, doctor_chat, symptom_extract, data_answer; tools: get_adherence, get_symptom_log, get_medication_plan, log_symptom, get_weekly_summary, notify_caregiver.",
                    "Served via vLLM/TGI-compatible endpoint (e.g., Qwen2-7B/LLaMA3-8B) with 4k–8k context for low-latency chat/analysis."
                  ]'
                  data-image="/images/yuvai_global_challenge/yuvai_AI_diagram.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/software.png"
                      alt="Gateway icon"
                    />
                    <div className="stack-name">
                      AI Gateway <br /> <i>Classifier + LLM-Core</i>
                    </div>
                  </div>
                </div>

                <div
                  className="stack-item"
                  data-title="Layer 3 — LLM-Analytics"
                  data-desc="Offline/batch intelligence that produces weekly insights and risk scores."
                  data-detail='[
                    "Cron/worker jobs compute adherence patterns, symptom trends, and alerts from dose_event_logs and symptom_logs.",
                    "LLM + RAG over long-term history to generate health_insights, patient_risk, weekly_summaries, population_insights.",
                    "Outputs cached in PostgreSQL/pgvector so LLM-Core can retrieve summaries instead of reprocessing raw data."
                  ]'
                  data-image="/images/yuvai_global_challenge/yuvai_AI_diagram.png"
                >
                  <div className="stack-card">
                    <img
                      className="stack-icon-img"
                      src="/images/iot_challenge/drop_detect_AI.png"
                      alt="Analytics icon"
                    />
                    <div className="stack-name">
                      LLM-Analytics <br /> <i>Batch Insights</i>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="stack-nav stack-nav-right"
                id="stackNextYuv"
                aria-label="Next stack"
              >
                ▶
              </button>
            </div>

            <div className="stack-details split" id="stackDetailsYuv" aria-live="polite">
              <div className="stack-details-left">
                <h5 id="stackDetailsTitleYuv">Edge Device Layer</h5>
                <div id="stackDetailsTextYuv" />
              </div>
              <div className="stack-details-right">
                <img
                  id="stackDetailsImgYuv"
                  src="/images/yuvai_global_challenge/yuvai_AI_diagram.png"
                  alt="MedMind AI orchestration"
                />
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </div>

      <SiteFooter />
    </>
  );
}
