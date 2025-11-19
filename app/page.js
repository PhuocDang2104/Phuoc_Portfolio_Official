// app/page.js
'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import AppNav from './components/AppNav';
import SiteFooter from './components/SiteFooter';
import ScrollReveal from './components/ScrollReveal';
import ContactForm from './components/ContactForm';

export default function HomePage() {
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
              Electrical - Electronic Engineering Student at HCMUT-VNU | Aspiring
              Embedded Engineer
            </div>
            <h1 className="hero-title">
              Engineering resilient AIoT system architectures — hardware - firmware
              - software
            </h1>
            <p className="lead">
              Skilled in ARM Cortex, RTOS, low-level drivers, and Edge AI
              deployment. Experienced in developing end-to-end IoT solutions from
              hardware and firmware to edge inference, gateways, and backend -
              frontend dashboards.
            </p>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#projects">
                Xem dự án nổi bật
              </a>
              <a
                className="btn btn-ghost"
                href="/Dang Nhu Phuoc _ CV _ Embedded Engineer.pdf"
                download
              >
                Download CV
              </a>
            </div>

            <div className="meta-row" aria-hidden="true">
              <div className="meta-pill">C/C++</div>
              <div className="meta-pill">Python</div>
              <div className="meta-pill">UART, SPI, I²C, CAN</div>
              <div className="meta-pill">Thread, BLE</div>
              <div className="meta-pill">
                RTOS (FreeRTOS, MicriumOS), Embedded Linux
              </div>
              <div className="meta-pill">Edge AI</div>
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
            I am a third-year Electrical &amp; Electronic Engineering student at
            HCMUT, aspiring to become an embedded engineer. I specialize in ARM
            Cortex firmware, RTOS, low-level drivers, and Edge AI deployment. I
            have designed and developed a range of IoT solutions, from hardware
            and firmware to edge inference, gateway, and cloud dashboards.
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
                    <strong>MCU firmware (EFR32):</strong>
                    <ul>
                      <li>
                        Developed HX711 load-cell driver &amp; IR sensor interrupts.
                      </li>
                      <li>
                        MicriumOS tasks:
                        <ul>
                          <li>Glass-break detection (I2S mic, 200 ms loop).</li>
                          <li>Temp/humidity sensing (SI7021, every 5s).</li>
                          <li>Continuous OpenThread networking.</li>
                        </ul>
                      </li>
                      <li>Enabled Thread-to-gateway messaging with failover.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Edge gateway (Raspberry Pi 4):</strong>
                    <ul>
                      <li>Configured as OTBR (MG21 RCP + Spinel).</li>
                      <li>Python scripts for Thread parsing, UART, I²C LCD1602.</li>
                      <li>MQTT gateway + PostgreSQL schema &amp; ETL scripts.</li>
                      <li>
                        Local DB for scent notes &amp; shelf ops with sync/offline
                        mode.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Software &amp; data platform:</strong>
                    <ul>
                      <li>Full-stack Flask app (APIs, templates, admin).</li>
                      <li>Smart Screen UI/UX (HTML, CSS, JS).</li>
                      <li>
                        Backend with Redis + PostgreSQL; Python workers for sync.
                      </li>
                      <li>
                        Collected &amp; processed 5k+ interactions for analytics
                        &amp; retraining.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Hardware engineering:</strong>
                    <ul>
                      <li>
                        Integrated sensors (load cell, cam, mic) with MCUs &amp; Pi.
                      </li>
                      <li>
                        PCB soldering, wiring validation, shelf-mounting design.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>AI:</strong>
                    <ul>
                      <li>
                        Python pipelines for dataset generation &amp; labeling.
                      </li>
                      <li>NLP pipeline (BERT + spaCy NER) for keyword extraction.</li>
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
                    • <strong>Hardware:</strong> ESP32-CAM/S3, DHT22, RFID RC522;
                    PCB &amp; PCBA for classification and cabin control.
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
                      Edge AIoT system on Intel hardware ensuring produce quality
                      via dual AI modules.
                    </strong>
                    <br />
                    <br />
                    • <strong>Hardware:</strong> Intel® NUC (CPU+GPU), 720p camera.
                    <br />
                    • <strong>Software:</strong> OpenVINO™, Intel® Tiber™ Cloud,
                    Edge Software Hub.
                    <br />
                    • <strong>AI Modules:</strong>
                    <br />
                    – <em>Vision AI:</em> fruit type, count, ripeness, external
                    defects.
                    <br />
                    – <em>NIR AI:</em> °Brix, moisture, internal bruises,
                    pest/disease detection.
                    <br />
                    • <strong>Evaluation:</strong> Real-time grading, defect
                    detection, SDG-aligned impact.
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

            {/* ======= CARD 1 — DENSO Hackathon ======= */}
            <article className="curproj-card reveal">
              <h3>DENSO Hackathon 2025 · Current Top 10 Finalist</h3>
              <p className="muted">
                Project:{" "}
                <strong>End-to-End Supply &amp; Demand Forecaster Software System</strong>.
              </p>

              <div className="chart-box">
                <canvas id="densoFanChart"></canvas>
              </div>

              <p className="muted small">Mock fan chart — demonstrating forecast uncertainty (P10/P50/P90).</p>
            </article>


            {/* ======= CARD 2 — Automotive Research ======= */}
            <article className="curproj-card reveal">
              <h3>Automotive Control Algorithms Research (PID / LQR / MPC)</h3>
              <p className="muted">
                Mentored by <strong>MEng Nguyễn Khánh Lợi</strong> and developed in collaboration with 
                <strong> Nhật Tân</strong> at <strong>MLIoT Lab — HCMUT</strong>.
                Focusing on advanced vehicle lateral control and model-based optimization.
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
                <span className="skill">C</span>
                <span className="skill">C++</span>
                <span className="skill">Python</span>
                <span className="skill">Assembly</span>
                <span className="skill">HTML</span>
                <span className="skill">CSS</span>
                <span className="skill">JavaScript</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Technical Tools</div>
              <div className="skills-grid">
                <span className="skill">Altium Designer</span>
                <span className="skill">EasyEDA</span>
                <span className="skill">Proteus</span>
                <span className="skill">SketchUp</span>
                <span className="skill">GitHub</span>
                <span className="skill">Git</span>
                <span className="skill">CMake</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Hardware Skills</div>
              <div className="skills-grid">
                <span className="skill">Soldering PCBA</span>
                <span className="skill">PCB Design</span>
                <span className="skill">Electrical Circuits</span>
                <span className="skill">Electronic Circuits</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">
                Microcontrollers / Microprocessors
              </div>
              <div className="skills-grid">
                <span className="skill">ARM Cortex-M</span>
                <span className="skill">AVR</span>
                <span className="skill">Raspberry Pi 4</span>
                <span className="skill">ESP32</span>
                <span className="skill">EFR32xG26</span>
                <span className="skill">EFR32xG24</span>
                <span className="skill">EFR32MG21</span>
                <span className="skill">ESP8266</span>
                <span className="skill">STM32</span>
                <span className="skill">BGM220</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">
                Serial &amp; Industrial Communication
              </div>
              <div className="skills-grid">
                <span className="skill">UART</span>
                <span className="skill">SPI</span>
                <span className="skill">I²C</span>
                <span className="skill">CAN</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Wireless Protocols</div>
              <div className="skills-grid">
                <span className="skill">Thread</span>
                <span className="skill">BLE</span>
              </div>
            </div>

            <div className="skills-row reveal">
              <div className="skills-label">Real-time &amp; Embedded OS</div>
              <div className="skills-grid">
                <span className="skill">
                  RTOS (FreeRTOS, MicriumOS)
                </span>
                <span className="skill">Embedded Linux</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT (component dùng chung) */}
        <ContactForm />
      </div>

      {/* FOOTER (component dùng chung, auto year) */}
      <SiteFooter />
    </>
  );
}