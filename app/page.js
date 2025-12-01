// app/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppNav from './components/AppNav';
import SiteFooter from './components/SiteFooter';
import ScrollReveal from './components/ScrollReveal';
import ContactForm from './components/ContactForm';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
  let sc;

  (async () => {
    // 1) Load Chart.js (ESM) và đẩy lên window
    const chartMod = await import('chart.js/auto');
    const Chart = chartMod.default ?? chartMod;
    window.Chart = Chart;

    // 2) (optional) Load three.js và đẩy lên window cho phần 3D
    const threeMod = await import('three');
    window.THREE = threeMod;
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    window.OrbitControls = OrbitControls;

    // 3) Sau khi đã có Chart + THREE trên global, mới load mock script
    sc = document.createElement('script');
    sc.src = '/components/current_projects.js';
    sc.async = true;
    document.body.appendChild(sc);
  })();

  // cleanup
  return () => {
    if (sc && document.body.contains(sc)) {
      document.body.removeChild(sc);
    }
  };
}, []);

  return (
    <>
      {/* Global ScrollReveal */}
      <ScrollReveal />

      {/* NAV (dùng component dùng chung) */}
      <AppNav />

      {/* HERO */}
      <section className="hero reveal" id="home" aria-label="Hero">
        <div className="page hero-inner">
          <div className="hero-left reveal">
            <div className="kicker">
              Electrical &amp; Electronic Engineering @ HCMUT-VNU | Aspiring AI
              Engineer
            </div>
            <h1 className="hero-title">
              Building reliable AI systems - data pipelines, models, software, edge
              deployments
            </h1>
            <p className="lead">
I’m a third-year student at HCMUT passionate about building AI that actually solves real problems. I work across ML, NLP, CV, and LLMs to create robust Python backends and intelligent software & edge systems — with a strong focus on agentic LLM architectures powered by RAG and tool-calling that turn raw data into practical, real-world actions</p>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#projects">
                Xem dự án nổi bật
              </a>
              <a
                className="btn btn-ghost"
                href="/Dang-Nhu-Phuoc_AI_CV_Bosch-Internship-2026.pdf"
                download
              >
                Download AI CV
              </a>
            </div>

            <div className="meta-row" aria-hidden="true">
              <div className="meta-pill">Python · C/C++ · Javascript/Typescript</div>
              <div className="meta-pill">ML/DL forecasting</div>
              <div className="meta-pill">NLP (BERT + spaCy NER)</div>
              <div className="meta-pill">LLMs (RAG &amp; tool-calling)</div>
              <div className="meta-pill">Computer Vision</div>
              <div className="meta-pill">Data pipelines: PostgreSQL, Redis, ETL</div>
              <div className="meta-pill">Backend | RESTful API · FastAPI · Flask</div>
              <div className="meta-pill">Frontend | Next.js · ThreeJS</div>
            </div>
          </div>

          <div className="hero-right reveal">
            <img
              src="/images/home_banner.png"
              alt="Hero image"
              className="hero-img-full"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="page">
        {/* ABOUT */}
        <section
          className="content reveal"
          id="about"
          aria-labelledby="about-title"
        >
          <h2 className="section-title" id="about-title">
            About
          </h2>
          <p className="muted">
            I’m a third-year Electrical & Electronic Engineering student at HCMUT focusing on AI-driven software systems. I work
with ML, DL, NLP, CV, LLMs to build software with Python-based backends, data pipelines and AI services, & integrate
them into IoT/edge environments. I’ve applied these skills in hackathons to deliver real, deployable AI solutions
          </p>
        </section>

        {/* PROJECTS */}
        <section
          className="content reveal"
          id="projects"
          aria-labelledby="projects-title"
        >
          <h2 className="section-title" id="projects-title">
            Highlighted Products &amp; Projects
          </h2>

          <div className="projects-grid">
            {/* BIG LEFT: IoT Challenge */}
            <article className="project-card big reveal" role="listitem">
              <img
                src="/images/iot_challenge_banner.png"
                alt="SCENT — Smart Customer Experience"
                className="project-thumb"
              />
              <div className="project-content">
                <h3>SCENT — System for Customer EXperience, iNventory &amp; Threats</h3>

                <div style={{ fontSize: '13px' }}>
                  Designed &amp; delivered a resilient{' '}
                  <strong>end-to-end AIoT system</strong> spanning firmware,
                  gateway, software, hardware, and AI platforms.
                </div>

                <ul style={{ fontSize: '14px' }}>
                  <li>
                    <strong>System design &amp; integration:</strong> Architected a
                    24/7 AIoT system with robust dataflows over Thread, BLE, UART,
                    I²C, MQTT.
                  </li>
                  <li>
                    <strong>AI &amp; Analytics</strong>
                    <ul>
                      <li>
                        Built Python pipelines to generate and label datasets from
                        &gt;5,000 real-world shelf interactions (pickup frequency,
                        dwell time, explicit feedback) and used them for preference
                        modelling &amp; anomaly detection.
                      </li>
                      <li>
                        Implemented an NLP pipeline (BERT + spaCy NER) to extract
                        keywords and intents from customer voice/text, feeding into
                        personalization logic and analytics dashboards.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Edge AI &amp; Automation</strong>
                    <ul>
                      <li>
                        Deployed edge ML models on Silabs EFR32 MCUs and Raspberry
                        Pi for fragrance recommendation, sound/drop detection and
                        basic speech analysis, enabling real-time on-device
                        decisions without cloud dependency.
                      </li>
                      <li>
                        Designed an event-driven firmware pipeline (MicriumOS tasks)
                        for glass-break detection, environment sensing, and Thread
                        networking, turning raw sensor events into structured AI
                        signals.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Edge Gateway (Raspberry Pi 4):</strong>
                    <ul>
                      <li>
                        Wrote Python scripts for Thread payload parsing, UART comms,
                        and I²C LCD1602 display.
                      </li>
                      <li>
                        Built MQTT gateway for LAN subscribers and PostgreSQL schema
                        + ETL scripts for data integration.
                      </li>
                      <li>
                        Designed and operated a normalized PostgreSQL database with
                        local SQL and Thread-sync logic.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Software &amp; Data Platform:</strong>
                    <ul>
                      <li>
                        Built full-stack Flask services (APIs, logic, templates,
                        admin panel) and Smart Screen UI/UX (HTML, CSS, JS) for
                        questionnaires &amp; personalized suggestions.
                      </li>
                      <li>
                        Orchestrated backend with Redis queues +
                        PostgreSQL/TimescaleDB, including real-time WebSocket
                        dashboards and offline-first AIoT sync over Thread/MQTT.
                      </li>
                      <li>
                        Implemented ETL pipelines, UPSERT logic, and Python workers
                        for data ingestion, device synchronization and analytics
                        workflows.
                      </li>
                      <li>
                        Collected &amp; preprocessed &gt;5,000+ real-world
                        interactions (pickup frequency, feedback, dwell time) for
                        analytics and model retraining.
                      </li>
                    </ul>
                  </li>
                </ul>

                <p className="muted" style={{ fontSize: '14px' }}>
                  <strong>Awards:</strong> 1st runner up (SILABS IoT Challenge) —{' '}
                  <em>Granted Internship Certification</em>
                  <br />
                  <strong>Github Link:</strong> https:// ...
                </p>
              </div>

              <div style={{ marginTop: '18px', textAlign: 'center' }}>
                <Link href="/iot_challenge_product" className="btn btn-case-study">
                  View case study
                </Link>
              </div>
            </article>

            {/* RIGHT COLUMN: 2 stacked */}
            <div className="projects-col">
              <article className="project-card reveal" role="listitem">
                <img
                  src="/images/humanlog2025_banner.png"
                  alt="Logistics Rescue Map"
                  className="project-thumb"
                />
                <div className="project-content">
                  <h3>ESP32Cam and RFID AIoT Solution in Warehouse</h3>
                  <p className="muted">
                    <strong>
                      Built a compact <em>AIoT logistics MVP</em> integrating
                      hardware, software, and system evaluation.
                    </strong>
                    <br />
                    <br />
                      • <strong>Hardware/AI:</strong> K-Means clustering ML pipeline
                      and YOLOv7 for human detection; ESP32-CAM/S3, DHT22, RFID
                      RC522; PCB &amp; PCBA for classification and cabin control.
                    <br />
                    • <strong>Prototype:</strong> Assembled within 15-hour
                    hackathon.
                    <br />
                    • <strong>Software:</strong> Flask app with SQL backend for
                    real-time monitoring.
                    <br />
                    • <strong>Evaluation:</strong> Assessed installability, power
                    usage, and offline operation.
                    <br />
                    <br />
                    <strong>Awards:</strong> 2nd runner up (HumanLog 2025)
                    <br />
                    <Link href="/klu_hackathon_project" className="link-accent">
                      View case study
                    </Link>
                  </p>
                </div>
              </article>

              <article className="project-card reveal" role="listitem">
                <img
                  src="/images/intel_ai_banner.png"
                  alt="Edge AI — Fruit quality"
                  className="project-thumb"
                />
                <div className="project-content">
                  <h3>AIMING - AIoT Infravision for Agricultural Quality</h3>
                  <p className="muted">
                    <strong>
                      Edge AIoT system on Intel industrial PC for real-time produce
                      grading.
                    </strong>
                    <br />
                    <br />
                    • <strong>Design:</strong> AIoT machine for agricultural input–output
                    grading on Intel® NUC (CPU/GPU) with 720p camera.
                    <br />
                    • <strong>Model:</strong> Multi-task Conv1D + MLP (TensorFlow/Keras)
                    on 6-dim NIR spectra + fruit metadata, predicting °Brix,
                    ripeness, moisture (regression) and grade/defect/fungus labels
                    (classification).
                    <br />
                    • <strong>Optimization:</strong> Converted Keras/ONNX to
                    OpenVINO™ IR (.bin/.xml), achieving ~3x faster inference on
                    Intel® hardware; used Intel® Tiber™ Cloud + Edge Software Hub.
                    <br />
                    • <strong>Monitoring:</strong> Built real-time dashboard
                    (frontend + backend) with Redis and MQTT to visualize fruit
                    quality and grading results.
                    <br />
                    <Link href="/intel_ai_project" className="link-accent">
                      View case study
                    </Link>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CURRENT PROJECTS */}
        <section className="content reveal" id="current-projects" aria-labelledby="curproj-title" style={{ marginTop: "64px" }}>
          <h2 className="section-title" id="curproj-title">Current Projects</h2>

          <div className="current-grid">

              {/* ======= CARD 1 — MedMind (YUVAi) ======= */}
              <article className="curproj-card reveal">
                <h3>YUVAi: Global Youth Challenge | Ongoing</h3>
                <p className="muted">
                  Project:{" "}
                  <strong>MedMind - AI-First Smart Medicine Box &amp; Multi-Layer LLM AI System</strong>.
                </p>

                <div className="chart-box">
                  <video
                    src="/MedMind_YUVAi_Proposal_Demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.setAttribute('controls', 'controls')}
                    onMouseLeave={(e) => e.currentTarget.removeAttribute('controls')}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      background: '#000',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                <div className="muted small" style={{ marginTop: '6px' }}>
                  If the video does not play, please download and view locally.
                  <a
                    href="/MedMind_YUVAi_Proposal_Demo.mp4"
                    download
                    className="btn btn-ghost"
                    style={{ marginLeft: '8px', padding: '6px 10px' }}
                  >
                    Download video
                  </a>
                </div>

                <p className="muted small">
                  MedMind demo — continuous loop (click video for controls if needed).
                </p>
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <Link href="/yuvai_global_challenge" className="btn btn-case-study">
                    View YUVAi case study
                  </Link>
                </div>
              </article>


            {/* ======= CARD 2 — Automotive Research ======= */}
            <article className="curproj-card reveal">
              <h3>Automotive Control Algorithms & AI Intelligent Perception Research</h3>
                <p className="muted">
                  Mentored by <strong>MEng Nguyễn Khánh Lợi</strong> and developed in collaboration with 
                  <strong> Nhật Tân</strong> at <strong>MLIoT Lab — HCMUT</strong>.
                  Focusing on advanced vehicle lateral control and model-based optimization.
                </p>

                <div className="auto-sim-wrap" style={{ marginBottom: '12px', width: '100%' }}>
                  <video
                    src="/1201.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={() => setIsVideoOpen(true)}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      height: '320px',
                      borderRadius: '14px',
                      border: '1px solid var(--border-subtle)',
                      background: '#000',
                      cursor: 'pointer',
                      objectFit: 'cover',
                      display: 'block',
                      margin: '0 auto'
                    }}
                    />
                  </div>
                  <div className="muted small" style={{ marginTop: '6px' }}>
                    If the video does not play, please download and view locally.
                    <a
                      href="/1201.mp4"
                      download
                      className="btn btn-ghost"
                      style={{ marginLeft: '8px', padding: '6px 10px' }}
                    >
                      Download video
                    </a>
                  </div>
                  <p className="muted small" style={{ marginTop: '-4px' }}>
                  Object detection demo — real traffic objects (vehicles, signs, lights) with onboard inference. ( click on video for fullscreen )
                </p>

                <div className="auto-sim-wrap">
                  <canvas id="auto3dCanvas"></canvas>
                  <canvas id="autoChart"></canvas>
                </div>

              <p className="muted small">Mock 3D demo — vehicle following a sinusoidal reference using LQR.</p>
            </article>

          </div>
        </section>

        

        {/* CERTIFICATIONS / AWARDS */}
        <section className="content reveal" id="exp" aria-labelledby="exp-title">
          <h2 className="section-title" id="exp-title">
            Certifications
          </h2>
          <div className="timeline">
            <div className="item reveal">
              <strong>IELTS 6.5</strong>
            </div>
            <div className="item reveal">
              <strong>Udemy Advanced Python / C / C++ Course</strong>
            </div>
            <div className="item reveal">
              <strong>UEHG club</strong>
              <div className="muted small">
                Charitable journeys to Bình Thuận &amp; Đắk Nông schools
              </div>
            </div>
          </div>

          <h2 className="section-title" style={{ marginTop: '32px' }}>
            Awards &amp; Achievements
          </h2>
          <div className="timeline">
            <div className="item reveal">
              <strong>Top 2 / 140 - FPT IoT Challenge 2025</strong>
              <div className="muted small">Nationwide Competition - Leader</div>
            </div>
            <div className="item reveal">
              <strong>Top 3 / 165 - HumanLog 2025</strong>
              <div className="muted small">Nationwide Competition</div>
            </div>
            <div className="item reveal">
              <strong>Top 10 - DENSO Hackathon</strong>
              <div className="muted small">
                Nationwide Competition
              </div>
            </div>
            <div className="item reveal">
              <strong>Top 10 / 132 - RMIT Hackathon 2025</strong>
              <div className="muted small">
                City Level Competition - Leader
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          className="content reveal"
          id="skills"
          aria-labelledby="skills-title"
        >
          <h2 className="section-title" id="skills-title">
            Skills &amp; Tools
          </h2>

          <div className="skills-groups">
            <div className="skills-row reveal">
              <div className="skills-label">Programming Languages</div>
              <div className="skills-grid">
                <span className="skill">Python</span>
                <span className="skill">C</span>
                <span className="skill">C++</span>
                <span className="skill">TypeScript</span>
                <span className="skill">SQL</span>
                <span className="skill">JavaScript</span>
                <span className="skill">HTML/CSS</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">AI / ML Focus</div>
              <div className="skills-grid">
                <span className="skill">ML/DL forecasting</span>
                <span className="skill">Computer Vision</span>
                <span className="skill">NLP (BERT/NER)</span>
                <span className="skill">LLMs &amp; RAG</span>
                <span className="skill">GenAI tool-calling</span>
                <span className="skill">Edge AI deployment</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Backend &amp; Data</div>
              <div className="skills-grid">
                <span className="skill">Flask</span>
                <span className="skill">FastAPI</span>
                <span className="skill">Next.js</span>
                <span className="skill">REST / WebSocket APIs</span>
                <span className="skill">PostgreSQL / TimescaleDB</span>
                <span className="skill">Redis / Celery</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Data &amp; Messaging</div>
              <div className="skills-grid">
                <span className="skill">ETL pipelines</span>
                <span className="skill">Scheduler services</span>
                <span className="skill">MQTT gateways</span>
                <span className="skill">Data modeling</span>
                <span className="skill">Chart.js dashboards</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Edge &amp; IoT Platforms</div>
              <div className="skills-grid">
                <span className="skill">Raspberry Pi 4</span>
                <span className="skill">EFR32 (Silabs)</span>
                <span className="skill">ESP32 / ESP32-CAM</span>
                <span className="skill">STM32</span>
                <span className="skill">Intel NUC</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Wireless &amp; Protocols</div>
              <div className="skills-grid">
                <span className="skill">Thread</span>
                <span className="skill">BLE</span>
                <span className="skill">MQTT</span>
                <span className="skill">TCP/IP</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">DevOps &amp; OS</div>
              <div className="skills-grid">
                <span className="skill">Git / GitHub</span>
                <span className="skill">Docker</span>
                <span className="skill">CMake</span>
                <span className="skill">Jupyter / Colab</span>
                <span className="skill">VS Code</span>
                <span className="skill">FreeRTOS / MicriumOS</span>
                <span className="skill">Embedded Linux</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT (component dùng chung) */}
        <ContactForm />
      </div>

      {isVideoOpen && (
        <div
          className="video-modal"
          onClick={() => setIsVideoOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.68)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(900px, 95vw)',
              background: '#0c0c0c',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 10px 50px rgba(0,0,0,0.4)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <video
              src="/1201.mp4"
              controls
              autoPlay
              loop
              style={{ width: '100%', display: 'block', background: '#000' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '10px 14px',
                background: '#0c0c0c'
              }}
            >
              <button
                className="btn btn-ghost"
                onClick={() => setIsVideoOpen(false)}
                style={{ margin: 0 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER (component dùng chung, auto year) */}
      <SiteFooter />
    </>
  );
}
