// public/components/current_projects.js
// Mock "Current Projects"
// - DENSO fan chart (P10/P50/P90 + history)
// - Automotive control: Three.js 3D car + Chart.js LQR vs PID

(function () {
  if (typeof window === 'undefined') return;

  // ---------------------------
  // 1. FAN CHART (DENSO)
  // ---------------------------
  function initDensoFanChart() {
    const canvas = document.getElementById('densoFanChart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not found – fan chart will not render');
      return;
    }

    const ctx = canvas.getContext('2d');

    // Mock data (8 tuần)
    const labels = ['W1','W2','W3','W4','W5','W6','W7','W8'];

    const history = [110, 128, 120, 135, 140, 150, 160, 170];
    const p10     = [100, 105, 108, 112, 118, 122, 128, 135];
    const p50     = [120, 125, 130, 138, 145, 152, 160, 170];
    const p90     = [140, 145, 152, 162, 170, 182, 195, 210];

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          // P10 anchor
          {
            label: 'P10',
            data: p10,
            borderColor: 'rgba(252, 211, 77, 0)',
            backgroundColor: 'rgba(252, 211, 77, 0)',
            fill: false,
            pointRadius: 0,
            tension: 0.25
          },
          // P90 fill xuống P10
          {
            label: 'P90',
            data: p90,
            borderColor: 'rgba(252, 211, 77, 0)',
            backgroundColor: 'rgba(252, 211, 77, 0.30)',
            fill: '-1',
            pointRadius: 0,
            tension: 0.25
          },
          // Forecast P50
          {
            label: 'Forecast P50',
            data: p50,
            borderColor: 'rgba(234, 179, 8, 1)',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            tension: 0.25
          },
          // History
          {
            label: 'History (Actual)',
            data: history,
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.25
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            labels: { font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label}: ${ctx.formattedValue}`
            }
          }
        },
        layout: {
          padding: { left: 8, right: 16, top: 8, bottom: 8 }
        },
        scales: {
          x: {
            title: { display: true, text: 'Week' },
            ticks: { maxTicksLimit: 8, autoSkip: true }
          },
          y: {
            title: { display: true, text: 'Demand (units)' },
            beginAtZero: false
          }
        }
      }
    });
  }

  // -----------------------------------------
  // 2. AUTOMOTIVE MOCK – Three.js 3D vehicle
  // -----------------------------------------
  function initAuto3D() {
    const canvas = document.getElementById('auto3dCanvas');
    if (!canvas) return;

    const THREE = window.THREE;
    if (!THREE) {
      console.warn('THREE.js not found – 3D canvas will not render');
      return;
    }

    const width  = canvas.clientWidth  || 360;
    const height = canvas.clientHeight || 220;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // slate-950
    scene.fog = new THREE.Fog(0x020617, 30, 120);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(-8, 8, 16);
    camera.lookAt(0, 0, 0);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left   = -40;
    dirLight.shadow.camera.right  =  40;
    dirLight.shadow.camera.top    =  40;
    dirLight.shadow.camera.bottom = -40;
    scene.add(dirLight);

    // Floor grid
    const grid = new THREE.GridHelper(80, 40, 0x1f2937, 0x111827);
    scene.add(grid);

    // Simple road plane
    const roadGeo = new THREE.PlaneGeometry(80, 8);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.1,
      roughness: 0.9
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.01;
    road.receiveShadow = true;
    scene.add(road);

    // Create sinus reference path
    const pathPoints = [];
    const nPoints = 160;
    const length = 40;
    for (let i = 0; i <= nPoints; i++) {
      const s = (i / nPoints) * length;     // dọc theo X
      const t = (i / nPoints) * 4 * Math.PI;
      const y = 0.0;
      const z = Math.sin(t) * 3.0;          // cong ngang
      pathPoints.push(new THREE.Vector3(s - length / 2, y, z));
    }
    const refCurve = new THREE.CatmullRomCurve3(pathPoints);

    // Tube for reference
    const refGeo = new THREE.TubeGeometry(refCurve, nPoints * 3, 0.06, 12, false);
    const refMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8, // gray-ish
      transparent: true,
      opacity: 0.45
    });
    const refMesh = new THREE.Mesh(refGeo, refMat);
    scene.add(refMesh);

    // Slightly perturbed "actual" path for LQR (bám tốt)
    const actualPts = [];
    for (let i = 0; i <= nPoints; i++) {
      const s = (i / nPoints) * length;
      const t = (i / nPoints) * 4 * Math.PI;
      const y = 0.0;
      const z =
        Math.sin(t) * 3.0 +
        0.2 * Math.sin(3 * t) * Math.exp(-i / nPoints); // lệch nhỏ rồi decay
      actualPts.push(new THREE.Vector3(s - length / 2, y + 0.03, z));
    }
    const actualCurve = new THREE.CatmullRomCurve3(actualPts);
    const actGeo = new THREE.TubeGeometry(actualCurve, nPoints * 3, 0.08, 16, false);
    const actMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x22c55e),
      emissive: new THREE.Color(0x22c55e),
      emissiveIntensity: 0.35,
      metalness: 0.0,
      roughness: 0.8
    });
    const actMesh = new THREE.Mesh(actGeo, actMat);
    actMesh.castShadow = true;
    scene.add(actMesh);

    // Vehicle model (giống code LQR nhưng gọn lại)
    function makeVehicle(colorHex) {
      const group = new THREE.Group();
      const scale = 3.2;

      const bodyGeo = new THREE.BoxGeometry(0.26 * scale, 0.08 * scale, 0.14 * scale);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.6,
        roughness: 0.4
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      body.receiveShadow = true;
      body.position.y = 0.08 * scale / 2 + 0.08;
      group.add(body);

      const wheelGeo = new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 0.02 * scale, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });

      const frontLeft = new THREE.Mesh(wheelGeo, wheelMat);
      frontLeft.rotation.z = Math.PI / 2;
      frontLeft.castShadow = true;
      frontLeft.position.set(0.13 * scale, 0.04 * scale, 0.08 * scale);

      const frontRight = frontLeft.clone();
      frontRight.position.z = -0.08 * scale;

      const frontGroup = new THREE.Group();
      frontGroup.add(frontLeft);
      frontGroup.add(frontRight);
      group.add(frontGroup);
      group.frontWheels = frontGroup;

      const rearLeft = new THREE.Mesh(wheelGeo, wheelMat);
      rearLeft.rotation.z = Math.PI / 2;
      rearLeft.castShadow = true;
      rearLeft.position.set(-0.13 * scale, 0.04 * scale, 0.08 * scale);

      const rearRight = rearLeft.clone();
      rearRight.position.z = -0.08 * scale;

      group.add(rearLeft);
      group.add(rearRight);

      return group;
    }

    const vehicle = makeVehicle(0x22c55e);
    scene.add(vehicle);

    // Khởi tạo vị trí xe
    vehicle.position.copy(actualCurve.getPointAt(0));
    vehicle.rotation.y = 0;

    // Animation: chạy dọc đường actualCurve
    let t = 0;
    const speed = 0.03; // càng lớn càng chạy nhanh

    function animate() {
      requestAnimationFrame(animate);

      t += speed;
      const u = (Math.sin(t * 0.1) * 0.02 + t * 0.08) % 1; // u in [0,1] với chút nhún
      const pos = actualCurve.getPointAt(u);
      const tangent = actualCurve.getTangentAt(u);

      vehicle.position.copy(pos);

      // heading từ tangent (x,z)
      const heading = Math.atan2(tangent.z, tangent.x);
      vehicle.rotation.y = -heading;

      // steering front wheels: đơn giản tỉ lệ với cong
      const steer = Math.max(-0.5, Math.min(0.5, tangent.z * 2.0));
      if (vehicle.frontWheels) {
        vehicle.frontWheels.rotation.y = -steer;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize (best effort)
    window.addEventListener('resize', () => {
      const w = canvas.clientWidth || width;
      const h = canvas.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  // -----------------------------------------
  // 3. Chart.js – LQR vs PID heading error
  // -----------------------------------------
  function initAutoChart() {
    const canvas = document.getElementById('autoChart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not found – auto control chart will not render');
      return;
    }

    const ctx = canvas.getContext('2d');

    const labels = [];
    const lqr = [];
    const pid = [];
    const n = 60;

    for (let i = 0; i < n; i++) {
      const t = i * 0.1;
      labels.push(t.toFixed(1));
      // LQR: nhanh, ít overshoot
      lqr.push(Math.exp(-0.35 * t) * Math.sin(1.2 * t));
      // PID: overshoot mạnh hơn, settle chậm hơn
      pid.push(1.2 * Math.exp(-0.2 * t) * Math.sin(1.3 * t));
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Heading error – LQR',
            data: lqr,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            tension: 0.35,
            pointRadius: 0
          },
          {
            label: 'Heading error – PID',
            data: pid,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            tension: 0.35,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { size: 11 } } }
        },
        scales: {
          x: {
            title: { display: true, text: 'Time (s)' }
          },
          y: {
            title: { display: true, text: 'e_ψ (rad, mock)' }
          }
        }
      }
    });
  }

  // ---------------------------
  // 4. INIT ENTRY
  // ---------------------------
  function initAll() {
    initDensoFanChart();
    initAuto3D();
    initAutoChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
